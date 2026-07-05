import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';

import { TableDataFacadeService } from '../../../../shared/table-state/services/table-data-facade.service';
import type { ICaseFilters } from '../../models/case-filters.interface';
import type { CaseSortKey } from '../../models/case-sort-key.type';
import type { ICase } from '../../models/case.interface';
import { CaseCategory } from '../../models/case-category.enum';
import { CasePriority } from '../../models/case-priority.enum';
import { CaseStatus } from '../../models/case-status.enum';
import { TableStateDirective } from '../../../../shared/table-state/directives/table-state.directive';
import { TableSortDirective } from '../../../../shared/table-state/directives/table-sort.directive';

interface ITagConfig {
  readonly label: string;
  readonly color: string;
}

const CATEGORY_LABELS: Record<CaseCategory, string> = {
  [CaseCategory.TECHNICAL_SUPPORT]: 'Technical Support',
  [CaseCategory.ACCOUNT_MANAGEMENT]: 'Account Management',
  [CaseCategory.BILLING]: 'Billing',
  [CaseCategory.SECURITY]: 'Security',
  [CaseCategory.FEATURE_REQUEST]: 'Feature Request',
};

const PRIORITY_TAG_CONFIG: Record<CasePriority, ITagConfig> = {
  [CasePriority.LOW]: {
    label: 'Low',
    color: 'green',
  },
  [CasePriority.MEDIUM]: {
    label: 'Medium',
    color: 'gold',
  },
  [CasePriority.HIGH]: {
    label: 'High',
    color: 'red',
  },
  [CasePriority.CRITICAL]: {
    label: 'Critical',
    color: 'magenta',
  },
};

const STATUS_TAG_CONFIG: Record<CaseStatus, ITagConfig> = {
  [CaseStatus.NEW]: {
    label: 'New',
    color: 'blue',
  },
  [CaseStatus.IN_PROGRESS]: {
    label: 'In progress',
    color: 'processing',
  },
  [CaseStatus.WAITING]: {
    label: 'Waiting',
    color: 'gold',
  },
  [CaseStatus.SLA_RISK]: {
    label: 'SLA risk',
    color: 'error',
  },
  [CaseStatus.CLOSED]: {
    label: 'Closed',
    color: 'default',
  },
};

@Component({
  selector: 'fd-cases-table',
  imports: [NzButtonModule, NzTableModule, NzTagModule, TableStateDirective, TableSortDirective],
  templateUrl: './cases-table.component.html',
  styleUrl: './cases-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CasesTableComponent {
  protected readonly table = inject<TableDataFacadeService<ICase, ICaseFilters, CaseSortKey>>(TableDataFacadeService);

  protected getCategoryLabel(category: CaseCategory): string {
    return CATEGORY_LABELS[category];
  }

  protected getPriorityConfig(priority: CasePriority): ITagConfig {
    return PRIORITY_TAG_CONFIG[priority];
  }

  protected getStatusConfig(status: CaseStatus): ITagConfig {
    return STATUS_TAG_CONFIG[status];
  }
}
