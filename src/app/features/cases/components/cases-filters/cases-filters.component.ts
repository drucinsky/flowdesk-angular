import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { CasePriority } from '../../models/case-priority.enum';
import { CaseStatus } from '../../models/case-status.enum';
import type { ICaseFilters } from '../../models/case-filters.interface';

@Component({
  selector: 'fd-cases-filters',
  imports: [FormsModule, NzButtonModule, NzIconModule, NzInputModule, NzSelectModule],
  templateUrl: './cases-filters.component.html',
  styleUrl: './cases-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CasesFiltersComponent {
  readonly filters = input.required<ICaseFilters>();
  readonly filtersChange = output<Partial<ICaseFilters>>();

  protected readonly caseStatus = CaseStatus;
  protected readonly casePriority = CasePriority;

  protected onSearchChange(search: string): void {
    this.filtersChange.emit({
      search,
    });
  }

  protected onStatusChange(status: CaseStatus | null): void {
    this.filtersChange.emit({
      status,
    });
  }

  protected onPriorityChange(priority: CasePriority | null): void {
    this.filtersChange.emit({
      priority,
    });
  }

  protected onAssigneeChange(assignee: string | null): void {
    this.filtersChange.emit({
      assignee,
    });
  }
}
