import { Component, output } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { DataTableComponent } from '../../../../shared/table-state/components/data-table/data-table.component';
import { TableCellDirective } from '../../../../shared/table-state/directives/table-cell.directive';
import type { ITableColumn } from '../../../../shared/table-state/models/table-column.interface';
import type { CaseSortKey } from '../../models/case-sort-key.type';
import type { ICaseTableRow } from '../../models/case-table-row.interface';
import type { ICaseTableActionEvent } from '../../models/case-table-action-event.interface';
import { CaseStatus } from '../../models/case-status.enum';

@Component({
  selector: 'fd-cases-table',
  imports: [DataTableComponent, NzButtonModule, NzTagModule, TableCellDirective],
  templateUrl: './cases-table.component.html',
  styleUrl: './cases-table.component.scss',
})
export class CasesTableComponent {
  protected readonly caseStatus = CaseStatus;

  protected readonly columns: readonly ITableColumn<CaseSortKey>[] = [
    { key: 'id', header: 'Case ID', width: '100px', sortKey: 'id' },
    { key: 'customer', header: 'Customer', width: '260px', sortKey: 'customer' },
    { key: 'category', header: 'Category', width: '180px', sortKey: 'category' },
    { key: 'priority', header: 'Priority', width: '130px', sortKey: 'priority' },
    { key: 'status', header: 'Status', width: '150px', sortKey: 'status' },
    { key: 'sla', header: 'SLA', width: '120px', sortKey: 'sla' },
    { key: 'assignee', header: 'Assignee', width: '160px', sortKey: 'assignee' },
    { key: 'updatedAt', header: 'Updated', width: '210px', sortKey: 'updatedAt' },
    { key: 'actions', header: 'Actions', width: '96px', align: 'center', cellClass: 'whitespace-nowrap' },
  ];

  protected readonly rowKey = (row: ICaseTableRow): string => row.id;
  protected readonly rowLabel = (row: ICaseTableRow): string => row.id;

  readonly rowAction = output<ICaseTableActionEvent>();

  protected closeCase(item: ICaseTableRow): void {
    this.rowAction.emit({
      action: 'close',
      item,
    });
  }
}
