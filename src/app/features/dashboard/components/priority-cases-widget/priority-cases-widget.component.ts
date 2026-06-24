import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';

import { DashboardCasePriority } from '../../models/dashboard-case-priority.enum';
import { DashboardCaseStatus } from '../../models/dashboard-case-status.enum';
import type { IDashboardCase } from '../../models/dashboard-case.interface';

interface ITagConfig {
  readonly label: string;
  readonly color: string;
}

const PRIORITY_TAG_CONFIG: Record<DashboardCasePriority, ITagConfig> = {
  [DashboardCasePriority.LOW]: {
    label: 'Low',
    color: 'green',
  },
  [DashboardCasePriority.MEDIUM]: {
    label: 'Medium',
    color: 'gold',
  },
  [DashboardCasePriority.HIGH]: {
    label: 'High',
    color: 'red',
  },
  [DashboardCasePriority.CRITICAL]: {
    label: 'Critical',
    color: 'magenta',
  },
};

const STATUS_TAG_CONFIG: Record<DashboardCaseStatus, ITagConfig> = {
  [DashboardCaseStatus.NEW]: {
    label: 'New',
    color: 'blue',
  },
  [DashboardCaseStatus.IN_PROGRESS]: {
    label: 'In progress',
    color: 'processing',
  },
  [DashboardCaseStatus.WAITING]: {
    label: 'Waiting',
    color: 'gold',
  },
  [DashboardCaseStatus.SLA_RISK]: {
    label: 'SLA risk',
    color: 'error',
  },
};

@Component({
  selector: 'fd-priority-cases-widget',
  imports: [NzButtonModule, NzTagModule],
  templateUrl: './priority-cases-widget.component.html',
  styleUrl: './priority-cases-widget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriorityCasesWidgetComponent {
  readonly cases = input.required<readonly IDashboardCase[]>();

  protected getPriorityConfig(priority: DashboardCasePriority): ITagConfig {
    return PRIORITY_TAG_CONFIG[priority];
  }

  protected getStatusConfig(status: DashboardCaseStatus): ITagConfig {
    return STATUS_TAG_CONFIG[status];
  }
}
