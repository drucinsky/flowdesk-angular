import { DestroyRef, Injectable, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { form } from '@angular/forms/signals';
import { NzMessageService } from 'ng-zorro-antd/message';
import { type Observable, filter, finalize, map, switchMap } from 'rxjs';

import { TEAM_MEMBERS } from '../../shared/data/team-members';
import { ConfirmDialogService } from '../../shared/modal/confirm-dialog.service';
import type { ISegmentTab } from '../../shared/segment-tabs/segment-tabs.component';
import { injectTableExport } from '../../shared/table-state/features/export/table-export.feature';
import { injectTableInlineEdit } from '../../shared/table-state/features/inline-edit/with-inline-edit.feature';
import { injectTableRowExpansion } from '../../shared/table-state/features/row-expansion/with-row-expansion.feature';
import { injectTableSelection } from '../../shared/table-state/features/selection/with-selection.feature';
import { injectTableState } from '../../shared/table-state/table-state.feature';
import { CUSTOMER_EDIT_SCHEMA } from './customer-edit.schema';
import { CustomersService } from './data-access/customers.service';
import { CUSTOMERS_EXPORT_COLUMNS } from './export/customers-export.columns';
import { mapCustomerDetailsToView } from './mappers/customer-details.mapper';
import { mapCustomerToTableRow } from './mappers/customer-table-row.mapper';
import type { ICustomerDetailsView } from './models/customer-details.interface';
import type { ICustomerFilters } from './models/customer-filters.interface';
import type { ICustomersDeleteResult } from './models/customers-delete-result.interface';
import { CUSTOMER_PLAN_OPTIONS } from './models/customer-plan-options';
import { CustomerPlan } from './models/customer-plan.enum';
import type { CustomerSortKey } from './models/customer-sort-key.type';
import { CustomerStatus } from './models/customer-status.enum';
import type { ICustomerTableRow } from './models/customer-table-row.interface';
import type { ICustomerUpdate } from './models/customer-update.interface';

/**
 * Composes the table state features of the customers screen and holds its domain logic.
 * Provided by the customers page together with `provideTableState()`.
 */
@Injectable()
export class CustomersFacade {
  private readonly _customersService = inject(CustomersService);
  private readonly _confirmDialog = inject(ConfirmDialogService);
  private readonly _message = inject(NzMessageService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _isDeleting = signal(false);
  private readonly _isSaving = signal(false);
  private readonly _editEnded = signal<{ readonly rowId: string } | null>(null);
  private readonly _export = injectTableExport<ICustomerTableRow, ICustomerFilters, CustomerSortKey>({
    fileName: 'customers',
    columns: CUSTOMERS_EXPORT_COLUMNS,
  });

  readonly table = injectTableState<ICustomerTableRow, ICustomerFilters, CustomerSortKey>();
  readonly selection = injectTableSelection<ICustomerTableRow>();
  readonly expansion = injectTableRowExpansion<ICustomerTableRow>();

  readonly inlineEdit = injectTableInlineEdit<ICustomerTableRow>();

  private readonly _editValue = signal<ICustomerUpdate>({ plan: CustomerPlan.FREE, owner: '' });

  readonly editForm = form(this._editValue, CUSTOMER_EDIT_SCHEMA);

  readonly isExporting = this._export.isExporting;
  readonly isDeleting = this._isDeleting.asReadonly();
  readonly isSaving = this._isSaving.asReadonly();
  /** Emits (a new object each time) when the user saved or cancelled an edit; not when it was cancelled automatically. */
  readonly editEnded = this._editEnded.asReadonly();

  readonly planOptions = CUSTOMER_PLAN_OPTIONS;
  readonly teamMembers = TEAM_MEMBERS;

  readonly statusTabs: readonly ISegmentTab<CustomerStatus>[] = [
    { label: 'All', value: null },
    { label: 'Active', value: CustomerStatus.ACTIVE },
    { label: 'Trial', value: CustomerStatus.TRIAL },
    { label: 'At risk', value: CustomerStatus.AT_RISK, tone: 'danger' },
    { label: 'Churned', value: CustomerStatus.CHURNED },
  ];

  exportCsv(): void {
    this._export.exportCsv();
  }

  updateStatus(status: CustomerStatus | null): void {
    this.table.updateFilters({
      status,
    });
  }

  loadDetails(customerId: string): Observable<ICustomerDetailsView> {
    return this._customersService.getCustomerDetails(customerId).pipe(map(mapCustomerDetailsToView));
  }

  startEdit(row: ICustomerTableRow): void {
    if (this._isSaving()) {
      return;
    }

    this._editValue.set({ plan: row.planValue, owner: row.owner });
    this.inlineEdit.start(row);
  }

  cancelEdit(): void {
    if (!this._isSaving()) {
      this._finishEdit();
    }
  }

  saveEdit(): void {
    const row = this.inlineEdit.editingRow();

    if (row === null || this._isSaving() || !this.editForm().valid()) {
      return;
    }

    const update = this._editValue();

    if (update.plan === row.planValue && update.owner === row.owner) {
      this._finishEdit();
      return;
    }

    this._isSaving.set(true);

    this._customersService
      .updateCustomer(row.id, update)
      .pipe(
        finalize(() => {
          this._isSaving.set(false);
        }),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe({
        next: (updatedCustomer) => {
          // Selection keeps whole rows, so a selected row would otherwise stay stale (e.g. in the CSV export).
          if (this.selection.isSelected(row)) {
            this.selection.toggle(mapCustomerToTableRow(updatedCustomer), true);
          }

          this._finishEdit();
          this.table.refresh();
          this._message.success(`Saved ${row.company}.`);
        },
        error: () => {
          this._message.error('Could not save the customer. Please try again.');
        },
      });
  }

  deleteSelected(): void {
    const rows = this.selection.selectedRows();

    if (rows.length === 0 || this._isDeleting() || this._isSaving()) {
      return;
    }

    this._confirmDialog
      .confirm({
        title: 'Delete customers',
        message: `Delete ${rows.length} ${rows.length === 1 ? 'customer' : 'customers'}? This action cannot be undone.`,
        confirmLabel: 'Delete',
        danger: true,
      })
      .pipe(
        filter((confirmed) => confirmed),
        switchMap(() => {
          this._isDeleting.set(true);

          return this._customersService.deleteCustomers(rows.map((row) => row.id)).pipe(
            finalize(() => {
              this._isDeleting.set(false);
            }),
          );
        }),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe({
        next: (result) => {
          this._handleDeleteResult(rows.length, result);
        },
        error: () => {
          this._message.error('Could not delete the customers. Please try again.');
        },
      });
  }

  /** Ends the edit by the user's action and lets the table return the focus to the row's edit button. */
  private _finishEdit(): void {
    const row = this.inlineEdit.editingRow();

    this.inlineEdit.stop();

    if (row !== null) {
      this._editEnded.set({ rowId: row.id });
    }
  }

  private _handleDeleteResult(requestedCount: number, result: ICustomersDeleteResult): void {
    const deletedIds = new Set(result.deletedIds);

    // Customers that could not be deleted stay selected, so the user can see them and retry.
    this.selection.deselect(this.selection.selectedRows().filter((row) => deletedIds.has(row.id)));

    if (deletedIds.size > 0) {
      this.table.refresh();
    }

    if (result.failed.length === 0) {
      this._message.success(`Deleted ${deletedIds.size} ${deletedIds.size === 1 ? 'customer' : 'customers'}.`);
    } else if (deletedIds.size === 0) {
      this._message.error(`No customers were deleted. ${result.failed[0].reason}`);
    } else {
      this._message.warning(
        `Deleted ${deletedIds.size} of ${requestedCount} customers. ${result.failed.length} could not be deleted: ${result.failed[0].reason}`,
      );
    }
  }
}
