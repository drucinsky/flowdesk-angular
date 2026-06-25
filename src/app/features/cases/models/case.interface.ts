import { type CaseCategory } from './case-category.enum';
import { type CasePriority } from './case-priority.enum';
import { type CaseStatus } from './case-status.enum';

export interface ICase {
  readonly id: string;
  readonly customer: string;
  readonly title: string;
  readonly category: CaseCategory;
  readonly priority: CasePriority;
  readonly status: CaseStatus;
  readonly sla: string;
  readonly assignee: string;
  readonly updatedAt: string;
}
