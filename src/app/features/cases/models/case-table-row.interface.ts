import { type CaseStatus } from './case-status.enum';

export interface ICaseTableTag {
  readonly label: string;
  readonly color: string;
}

export interface ICaseTableRow {
  readonly id: string;
  readonly customer: string;
  readonly title: string;
  readonly categoryLabel: string;
  readonly priority: ICaseTableTag;
  readonly status: ICaseTableTag;
  readonly statusValue: CaseStatus;
  readonly sla: string;
  readonly assignee: string;
  readonly updatedAt: string;
}
