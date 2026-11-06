import { Component, inject } from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

import { DataTableComponent } from '../../../../shared/table-state/components/data-table/data-table.component';
import { TableSelectionBarComponent } from '../../../../shared/table-state/components/table-selection-bar/table-selection-bar.component';
import { injectTableEditFocus } from '../../../../shared/table-state/composables/table-edit-focus.composable';
import { TableCellDirective, TableExpandedRowDirective } from '../../../../shared/table-state/directives/table-cell.directive';
import type { ITableColumn } from '../../../../shared/table-state/models/table-column.interface';
import { CustomersFacade } from '../../customers.facade';
import type { CustomerSortKey } from '../../models/customer-sort-key.type';
import type { ICustomerTableRow } from '../../models/customer-table-row.interface';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';

@Component({
  selector: 'fd-customers-table',
  imports: [
    CustomerDetailsComponent,
    DataTableComponent,
    FormField,
    NzAvatarModule,
    NzButtonModule,
    NzIconModule,
    NzSelectModule,
    NzTagModule,
    NzTooltipModule,
    TableCellDirective,
    TableExpandedRowDirective,
    TableSelectionBarComponent,
  ],
  templateUrl: './customers-table.component.html',
  styleUrl: './customers-table.component.scss',
})
export class CustomersTableComponent {
  protected readonly facade = inject(CustomersFacade);
  protected readonly editButtonIdPrefix = 'customer-edit-';

  protected readonly columns: readonly ITableColumn<CustomerSortKey>[] = [
    { key: 'company', header: 'Customer', width: '320px', sortKey: 'company' },
    { key: 'plan', header: 'Plan', width: '130px', sortKey: 'plan' },
    { key: 'status', header: 'Status', width: '140px', sortKey: 'status' },
    { key: 'owner', header: 'Owner', width: '160px', sortKey: 'owner' },
    { key: 'country', header: 'Country', width: '150px', sortKey: 'country' },
    { key: 'openCases', header: 'Open cases', width: '130px', sortKey: 'openCases', align: 'right' },
    { key: 'mrr', header: 'MRR', width: '120px', sortKey: 'mrr', align: 'right' },
    { key: 'lastActivityAt', header: 'Last activity', width: '200px', sortKey: 'lastActivityAt' },
    { key: 'actions', header: 'Actions', width: '110px', fixed: 'right', hideHeader: true },
  ];

  protected readonly rowKey = (row: ICustomerTableRow): string => row.id;
  protected readonly rowLabel = (row: ICustomerTableRow): string => row.company;

  private readonly _editFocus = injectTableEditFocus(this.facade.rowEdit.editEnded, this.editButtonIdPrefix);
}
