import { Injectable, inject } from '@angular/core';
import { type Observable, map } from 'rxjs';

import { TEAM_MEMBERS } from '../../shared/data/team-members';
import type { ISegmentTab } from '../../shared/segment-tabs/segment-tabs.component';
import { injectTableBulkDelete } from '../../shared/table-state/composables/table-bulk-delete.composable';
import { injectTableRowEdit } from '../../shared/table-state/composables/table-row-edit.composable';
import { injectTableExport } from '../../shared/table-state/features/export/table-export.feature';
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
  private readonly _export = injectTableExport<ICustomerTableRow, ICustomerFilters, CustomerSortKey>({
    fileName: 'customers',
    columns: CUSTOMERS_EXPORT_COLUMNS,
  });

  readonly table = injectTableState<ICustomerTableRow, ICustomerFilters, CustomerSortKey>();
  readonly selection = injectTableSelection<ICustomerTableRow>();
  readonly expansion = injectTableRowExpansion<ICustomerTableRow>();

  readonly rowEdit = injectTableRowEdit<ICustomerTableRow, ICustomerUpdate>({
    rowId: (row) => row.id,
    emptyValue: { plan: CustomerPlan.FREE, owner: '' },
    schema: CUSTOMER_EDIT_SCHEMA,
    toValue: (row) => ({ plan: row.planValue, owner: row.owner }),
    isUnchanged: (row, update) => update.plan === row.planValue && update.owner === row.owner,
    save: (row, update) => this._customersService.updateCustomer(row.id, update).pipe(map(mapCustomerToTableRow)),
    savedMessage: (row) => `Saved ${row.company}.`,
    errorMessage: 'Could not save the customer. Please try again.',
  });

  readonly bulkDelete = injectTableBulkDelete<ICustomerTableRow>({
    rowId: (row) => row.id,
    delete: (rows) => this._customersService.deleteCustomers(rows.map((row) => row.id)),
    entity: { singular: 'customer', plural: 'customers' },
    confirmTitle: 'Delete customers',
    isBlocked: () => this.rowEdit.isSaving(),
  });

  readonly isExporting = this._export.isExporting;

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
}
