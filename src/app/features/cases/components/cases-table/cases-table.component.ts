import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';

import { CaseCategory } from '../../models/case-category.enum';
import { CasePriority } from '../../models/case-priority.enum';
import { CaseStatus } from '../../models/case-status.enum';
import type { ICase } from '../../models/case.interface';
import { DEFAULT_TABLE_SCROLL } from '../../../../shared/config/table-scroll.config';

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
  imports: [NzButtonModule, NzTableModule, NzTagModule],
  templateUrl: './cases-table.component.html',
  styleUrl: './cases-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CasesTableComponent {
  readonly cases = input.required<readonly ICase[]>();
  readonly total = input.required<number>();
  readonly pageIndex = input.required<number>();
  readonly pageSize = input.required<number>();
  readonly isLoading = input(false);

  readonly pageIndexChange = output<number>();
  readonly pageSizeChange = output<number>();

  protected readonly tableScroll = DEFAULT_TABLE_SCROLL;

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
