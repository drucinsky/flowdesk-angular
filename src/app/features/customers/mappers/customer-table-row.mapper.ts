import { CustomerPlan } from '../models/customer-plan.enum';
import { CustomerStatus } from '../models/customer-status.enum';
import type { ICustomerTableRow, ICustomerTableTag } from '../models/customer-table-row.interface';
import type { ICustomer } from '../models/customer.interface';

const LAST_ACTIVITY_FORMATTER = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

const MRR_FORMATTER = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const PLAN_TAG_CONFIG: Record<CustomerPlan, ICustomerTableTag> = {
  [CustomerPlan.FREE]: {
    label: 'Free',
    color: 'default',
  },
  [CustomerPlan.PRO]: {
    label: 'Pro',
    color: 'blue',
  },
  [CustomerPlan.ENTERPRISE]: {
    label: 'Enterprise',
    color: 'purple',
  },
};

const STATUS_TAG_CONFIG: Record<CustomerStatus, ICustomerTableTag> = {
  [CustomerStatus.ACTIVE]: {
    label: 'Active',
    color: 'success',
  },
  [CustomerStatus.TRIAL]: {
    label: 'Trial',
    color: 'processing',
  },
  [CustomerStatus.AT_RISK]: {
    label: 'At risk',
    color: 'error',
  },
  [CustomerStatus.CHURNED]: {
    label: 'Churned',
    color: 'default',
  },
};

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

export function mapCustomerToTableRow(customer: ICustomer): ICustomerTableRow {
  return {
    id: customer.id,
    initials: getInitials(customer.company),
    company: customer.company,
    contactName: customer.contactName,
    email: customer.email,
    country: customer.country,
    plan: PLAN_TAG_CONFIG[customer.plan],
    status: STATUS_TAG_CONFIG[customer.status],
    statusValue: customer.status,
    owner: customer.owner,
    openCases: customer.openCases,
    mrr: MRR_FORMATTER.format(customer.mrr),
    lastActivityAt: LAST_ACTIVITY_FORMATTER.format(new Date(customer.lastActivityAt)),
  };
}
