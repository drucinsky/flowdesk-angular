import { Component, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { SegmentTabsComponent } from '../../../../shared/segment-tabs/segment-tabs.component';
import { TableKey } from '../../../../shared/table-state/config/table-key.enum';
import { TableSortDirection } from '../../../../shared/table-state/models/table-sort.interface';
import { withRowExpansion } from '../../../../shared/table-state/features/row-expansion/with-row-expansion.feature';
import { withSelection } from '../../../../shared/table-state/features/selection/with-selection.feature';
import { provideTableState } from '../../../../shared/table-state/providers/provide-table-state';
import { CustomersFiltersComponent } from '../../components/customers-filters/customers-filters.component';
import { CustomersTableComponent } from '../../components/customers-table/customers-table.component';
import { CustomersTableDataSource } from '../../data-access/customers-table-data-source.service';
import { CustomersFacade } from '../../customers.facade';
import { DEFAULT_CUSTOMER_FILTERS, type ICustomerFilters } from '../../models/customer-filters.interface';
import type { CustomerSortKey } from '../../models/customer-sort-key.type';
import type { ICustomerTableRow } from '../../models/customer-table-row.interface';

@Component({
  selector: 'fd-customers-page',
  imports: [NzButtonModule, NzIconModule, NzSpinModule, SegmentTabsComponent, CustomersFiltersComponent, CustomersTableComponent],
  providers: [
    provideTableState<ICustomerTableRow, ICustomerFilters, CustomerSortKey>(
      {
        key: TableKey.CUSTOMERS,
        defaultFilters: DEFAULT_CUSTOMER_FILTERS,
        defaultPageSize: 10,
        defaultSort: {
          key: 'lastActivityAt',
          direction: TableSortDirection.DESC,
        },
        dataSource: CustomersTableDataSource,
      },
      withSelection<ICustomerTableRow>({
        rowKey: (row) => row.id,
      }),
      withRowExpansion<ICustomerTableRow>({
        rowKey: (row) => row.id,
        mode: 'multiple',
      }),
    ),
    CustomersFacade,
  ],
  templateUrl: './customers-page.component.html',
  styleUrl: './customers-page.component.scss',
})
export class CustomersPageComponent {
  protected readonly facade = inject(CustomersFacade);
}
