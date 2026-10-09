import { Component, inject } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

import { TableSelectionBarComponent } from '../../../../shared/table-state/components/table-selection-bar/table-selection-bar.component';
import { TableSortDirective } from '../../../../shared/table-state/directives/table-sort.directive';
import { TableStateDirective } from '../../../../shared/table-state/directives/table-state.directive';
import { CustomersFacade } from '../../customers.facade';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';

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
  protected readonly facade = inject(CustomersFacade);
}
