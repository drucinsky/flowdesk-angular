import { Component } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

import { TableSelectionBarComponent } from '../../../../shared/table-state/components/table-selection-bar/table-selection-bar.component';
import { injectTableRowExpansion } from '../../../../shared/table-state/features/row-expansion/with-row-expansion.feature';
import { injectTableSelection } from '../../../../shared/table-state/features/selection/with-selection.feature';
import { TableSortDirective } from '../../../../shared/table-state/directives/table-sort.directive';
import { TableStateDirective } from '../../../../shared/table-state/directives/table-state.directive';
import { injectTableState } from '../../../../shared/table-state/table-state.feature';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';
import type { ICustomerFilters } from '../../models/customer-filters.interface';
import type { CustomerSortKey } from '../../models/customer-sort-key.type';
import type { ICustomerTableRow } from '../../models/customer-table-row.interface';

@Component({
  selector: 'fd-customers-table',
  imports: [
    CustomerDetailsComponent,
    NzAvatarModule,
    NzButtonModule,
    NzIconModule,
    NzTableModule,
    NzTagModule,
    NzTooltipModule,
    TableSelectionBarComponent,
    TableStateDirective,
    TableSortDirective,
  ],
  templateUrl: './customers-table.component.html',
  styleUrl: './customers-table.component.scss',
})
export class CustomersTableComponent {
  protected readonly table = injectTableState<ICustomerTableRow, ICustomerFilters, CustomerSortKey>();
  protected readonly selection = injectTableSelection<ICustomerTableRow>();
  protected readonly expansion = injectTableRowExpansion<ICustomerTableRow>();
}
