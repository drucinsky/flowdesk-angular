import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { CasePriority } from '../../models/case-priority.enum';
import { CaseStatus } from '../../models/case-status.enum';
import type { ICaseFilters } from '../../models/case-filters.interface';
import { BaseTableFiltersComponent } from '../../../../shared/table-state/filters/base-table-filters.component';

type CasesFiltersForm = FormGroup<{
  search: FormControl<string>;
  status: FormControl<CaseStatus | null>;
  priority: FormControl<CasePriority | null>;
  assignee: FormControl<string | null>;
}>;

@Component({
  selector: 'fd-cases-filters',
  imports: [ReactiveFormsModule, NzButtonModule, NzIconModule, NzInputModule, NzSelectModule],
  templateUrl: './cases-filters.component.html',
  styleUrl: './cases-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CasesFiltersComponent extends BaseTableFiltersComponent<ICaseFilters, CasesFiltersForm> {
  protected readonly caseStatus = CaseStatus;
  protected readonly casePriority = CasePriority;

  protected override createForm(): CasesFiltersForm {
    return new FormGroup({
      search: new FormControl<string>('', { nonNullable: true }),
      status: new FormControl<CaseStatus | null>(null),
      priority: new FormControl<CasePriority | null>(null),
      assignee: new FormControl<string | null>(null),
    });
  }
}
