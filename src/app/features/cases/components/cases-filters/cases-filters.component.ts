import { Component, model } from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { CasePriority } from '../../models/case-priority.enum';
import { CaseStatus } from '../../models/case-status.enum';
import type { ICaseFilters } from '../../models/case-filters.interface';
import { CASES_FILTERS_SCHEMA } from './cases-filters.schema';
import { injectTableFilters } from '../../../../shared/table-state/filters/table-filters.feature';

@Component({
  selector: 'fd-cases-filters',
  imports: [FormField, NzButtonModule, NzIconModule, NzInputModule, NzSelectModule],
  templateUrl: './cases-filters.component.html',
  styleUrl: './cases-filters.component.scss',
})
export class CasesFiltersComponent {
  readonly filters = model.required<ICaseFilters>();

  protected readonly caseStatus = CaseStatus;
  protected readonly casePriority = CasePriority;

  private readonly _tableFilters = injectTableFilters(this.filters, CASES_FILTERS_SCHEMA);

  protected readonly filtersForm = this._tableFilters.form;

  protected resetFilters(): void {
    this._tableFilters.reset();
  }
}
