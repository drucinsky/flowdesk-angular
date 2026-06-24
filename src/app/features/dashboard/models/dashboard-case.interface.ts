import { type DashboardCasePriority } from './dashboard-case-priority.enum';
import { type DashboardCaseStatus } from './dashboard-case-status.enum';

export interface IDashboardCase {
  readonly id: string;
  readonly customer: string;
  readonly title: string;
  readonly priority: DashboardCasePriority;
  readonly status: DashboardCaseStatus;
  readonly sla: string;
  readonly assignee: string;
}
