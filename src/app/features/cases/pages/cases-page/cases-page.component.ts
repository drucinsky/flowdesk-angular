import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { DEFAULT_CASE_FILTERS, type ICaseFilters } from '../../models/case-filters.interface';
import type { CaseStatus } from '../../models/case-status.enum';
import type { CaseSortKey } from '../../models/case-sort-key.type';
import { CasesFiltersComponent } from '../../components/cases-filters/cases-filters.component';
import { CasesStatusTabsComponent } from '../../components/cases-status-tabs/cases-status-tabs.component';
import { CasesTableComponent } from '../../components/cases-table/cases-table.component';
import { CasesTableDataSource } from '../../data-access/cases-table-data-source.service';
import { TableKey } from '../../../../shared/table-state/config/table-key.enum';
import { TableSortDirection } from '../../../../shared/table-state/models/table-sort.interface';
import { provideTableState } from '../../../../shared/table-state/providers/provide-table-state';
import { TableDataFacadeService } from '../../../../shared/table-state/services/table-data-facade.service';
import type { ICaseTableRow } from '../../models/case-table-row.interface';

@Component({
  selector: 'fd-cases-page',
  imports: [NzButtonModule, NzIconModule, NzSpinModule, CasesFiltersComponent, CasesStatusTabsComponent, CasesTableComponent],
  providers: [
    provideTableState<ICaseTableRow, ICaseFilters, CaseSortKey>({
      key: TableKey.CASES,
      defaultFilters: DEFAULT_CASE_FILTERS,
      defaultPageSize: 10,
      defaultSort: {
        key: 'updatedAt',
        direction: TableSortDirection.DESC,
      },
      dataSource: CasesTableDataSource,
    }),
  ],
  templateUrl: './cases-page.component.html',
  styleUrl: './cases-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CasesPageComponent {
  protected readonly table = inject<TableDataFacadeService<ICaseTableRow, ICaseFilters, CaseSortKey>>(TableDataFacadeService);

  protected updateStatus(status: CaseStatus | null): void {
    this.table.updateFilters({
      status,
    });
  }
}
