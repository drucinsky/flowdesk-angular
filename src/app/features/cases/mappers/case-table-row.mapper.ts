import { CaseCategory } from '../models/case-category.enum';
import { CasePriority } from '../models/case-priority.enum';
import { CaseStatus } from '../models/case-status.enum';
import type { ICaseTableRow, ICaseTableTag } from '../models/case-table-row.interface';
import type { ICase } from '../models/case.interface';

const UPDATED_AT_FORMATTER = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

const CATEGORY_LABELS: Record<CaseCategory, string> = {
  [CaseCategory.TECHNICAL_SUPPORT]: 'Technical Support',
  [CaseCategory.ACCOUNT_MANAGEMENT]: 'Account Management',
  [CaseCategory.BILLING]: 'Billing',
  [CaseCategory.SECURITY]: 'Security',
  [CaseCategory.FEATURE_REQUEST]: 'Feature Request',
};

const PRIORITY_TAG_CONFIG: Record<CasePriority, ICaseTableTag> = {
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

const STATUS_TAG_CONFIG: Record<CaseStatus, ICaseTableTag> = {
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

export function mapCaseToTableRow(caseItem: ICase): ICaseTableRow {
  return {
    id: caseItem.id,
    customer: caseItem.customer,
    title: caseItem.title,
    categoryLabel: CATEGORY_LABELS[caseItem.category],
    priority: PRIORITY_TAG_CONFIG[caseItem.priority],
    status: STATUS_TAG_CONFIG[caseItem.status],
    statusValue: caseItem.status,
    sla: caseItem.sla,
    assignee: caseItem.assignee,
    updatedAt: UPDATED_AT_FORMATTER.format(new Date(caseItem.updatedAt)),
  };
}
