import { Injectable, inject } from '@angular/core';
import { type Observable, map } from 'rxjs';

import type { ISegmentTab } from '../../shared/segment-tabs/segment-tabs.component';
import { injectTableExport } from '../../shared/table-state/features/export/table-export.feature';
import { injectTableRowExpansion } from '../../shared/table-state/features/row-expansion/with-row-expansion.feature';
import { injectTableSelection } from '../../shared/table-state/features/selection/with-selection.feature';
import { injectTableState } from '../../shared/table-state/table-state.feature';
import { CustomersService } from './data-access/customers.service';
import { CUSTOMERS_EXPORT_COLUMNS } from './export/customers-export.columns';
import { mapCustomerDetailsToView } from './mappers/customer-details.mapper';
import type { ICustomerDetailsView } from './models/customer-details.interface';
import type { ICustomerFilters } from './models/customer-filters.interface';
import type { CustomerSortKey } from './models/customer-sort-key.type';
import { CustomerStatus } from './models/customer-status.enum';
import type { ICustomerTableRow } from './models/customer-table-row.interface';

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

  readonly isExporting = this._export.isExporting;

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
