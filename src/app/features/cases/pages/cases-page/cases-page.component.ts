import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { CasesFiltersComponent } from '../../components/cases-filters/cases-filters.component';
import { CasesStatusTabsComponent } from '../../components/cases-status-tabs/cases-status-tabs.component';
import { CasesTableComponent } from '../../components/cases-table/cases-table.component';
import { CasesService } from '../../data-access/cases.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { type CaseStatus } from '../../models/case-status.enum';
import { DEFAULT_CASE_FILTERS, type ICaseFilters } from '../../models/case-filters.interface';

@Component({
  selector: 'fd-cases-page',
  imports: [
    NzButtonModule,
    NzIconModule,
    NzSpinModule,
    CasesFiltersComponent,
    CasesStatusTabsComponent,
    CasesTableComponent,
  ],
  templateUrl: './cases-page.component.html',
  styleUrl: './cases-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CasesPageComponent {
  private readonly _casesService = inject(CasesService);

  protected readonly filters = signal<ICaseFilters>(DEFAULT_CASE_FILTERS);
  protected readonly pageIndex = signal(1);
  protected readonly pageSize = signal(10);
  protected readonly refreshTrigger = signal(0);

  protected readonly query = computed(() => ({
    filters: this.filters(),
    pageIndex: this.pageIndex(),
    pageSize: this.pageSize(),
    refresh: this.refreshTrigger(),
  }));

  protected readonly casesResource = rxResource({
    params: () => this.query(),
    stream: ({ params }) => this._casesService.getCasesData(params),
  });

  protected readonly casesData = computed(() => this.casesResource.value());

  protected updateFilters(filters: Partial<ICaseFilters>): void {
    this.filters.update((currentFilters) => ({
      ...currentFilters,
      ...filters,
    }));

    this.pageIndex.set(1);
  }

  protected updateStatus(status: CaseStatus | null): void {
    this.updateFilters({
      status,
    });
  }

  protected updatePageIndex(pageIndex: number): void {
    this.pageIndex.set(pageIndex);
  }

  protected updatePageSize(pageSize: number): void {
    this.pageSize.set(pageSize);
    this.pageIndex.set(1);
  }

  protected refreshCases(): void {
    this.refreshTrigger.update((value) => value + 1);
  }
}
