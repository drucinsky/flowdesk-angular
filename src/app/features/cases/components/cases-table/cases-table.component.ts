import { Component, inject, output } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { TableDataFacadeService } from '../../../../shared/table-state/services/table-data-facade.service';
import type { ICaseFilters } from '../../models/case-filters.interface';
import type { CaseSortKey } from '../../models/case-sort-key.type';
import { TableStateDirective } from '../../../../shared/table-state/directives/table-state.directive';
import { TableSortDirective } from '../../../../shared/table-state/directives/table-sort.directive';
import type { ICaseTableRow } from '../../models/case-table-row.interface';
import type { ICaseTableActionEvent } from '../../models/case-table-action-event.interface';
import { CaseStatus } from '../../models/case-status.enum';

@Component({
  selector: 'fd-cases-table',
  imports: [NzButtonModule, NzTableModule, NzTagModule, TableStateDirective, TableSortDirective],
  templateUrl: './cases-table.component.html',
  styleUrl: './cases-table.component.scss',
})
export class CasesTableComponent {
  protected readonly table = inject<TableDataFacadeService<ICaseTableRow, ICaseFilters, CaseSortKey>>(TableDataFacadeService);
  protected readonly caseStatus = CaseStatus;

  readonly rowAction = output<ICaseTableActionEvent>();

  protected closeCase(item: ICaseTableRow): void {
    this.rowAction.emit({
      action: 'close',
      item,
    });
  }
}
