import { Component } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';

import { TableSortDirective } from '../../../../shared/table-state/directives/table-sort.directive';
import { TableStateDirective } from '../../../../shared/table-state/directives/table-state.directive';
import { injectTableState } from '../../../../shared/table-state/table-state.feature';
import type { ICustomerFilters } from '../../models/customer-filters.interface';
import type { CustomerSortKey } from '../../models/customer-sort-key.type';
import type { ICustomerTableRow } from '../../models/customer-table-row.interface';

@Component({
  selector: 'fd-customers-table',
  imports: [NzAvatarModule, NzTableModule, NzTagModule, TableStateDirective, TableSortDirective],
  templateUrl: './customers-table.component.html',
  styleUrl: './customers-table.component.scss',
})
export class CustomersTableComponent {
  protected readonly table = injectTableState<ICustomerTableRow, ICustomerFilters, CustomerSortKey>();
}
