import { type CasePriority } from './case-priority.enum';
import { type CaseStatus } from './case-status.enum';

export interface ICaseFilters {
  readonly search: string;
  readonly status: CaseStatus | null;
  readonly priority: CasePriority | null;
  readonly assignee: string | null;
}

export const DEFAULT_CASE_FILTERS: ICaseFilters = {
  search: '',
  status: null,
  priority: null,
  assignee: null,
};
