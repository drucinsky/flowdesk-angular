import type { ICustomerDetails, ICustomerRecentCase } from '../models/customer-details.interface';
import type { ICustomer } from '../models/customer.interface';

const STREETS: readonly string[] = [
  '12 Market Street',
  '48 River Road',
  '7 Hill Avenue',
  '103 Station Square',
  '29 Park Lane',
  '61 Harbour Way',
];

const CASE_TITLES: readonly string[] = [
  'Unable to access analytics dashboard',
  'Billing details mismatch',
  'New user access request',
  'Export fails for large reports',
  'SSO login loop after password reset',
  'Request to update account owner',
];

const CASE_STATUSES: readonly string[] = ['In progress', 'Waiting', 'New', 'Closed'];

const NOTES: readonly string[] = [
  'Prefers contact by e-mail. Renewal discussion planned next quarter.',
  'Asked about the enterprise plan during the last call. Needs a security questionnaire.',
  'Trial extended once. Follow up on onboarding progress.',
  'Churn risk flagged after two escalations. Executive sponsor should be informed.',
];

const HOUR_IN_MS = 60 * 60 * 1000;
const RECENT_CASES_BASE = Date.UTC(2025, 4, 17, 14, 0, 0);

function getCustomerIndex(customer: ICustomer): number {
  return Number(customer.id.replace('CUS-', '')) - 1001;
}

function createRecentCases(customer: ICustomer, index: number): readonly ICustomerRecentCase[] {
  const count = Math.min(customer.openCases, 3);

  return Array.from({ length: count }, (_, caseIndex) => ({
    id: `#${12400 - index * 3 - caseIndex}`,
    title: CASE_TITLES[(index + caseIndex) % CASE_TITLES.length],
    status: CASE_STATUSES[(index + caseIndex) % CASE_STATUSES.length],
    updatedAt: new Date(RECENT_CASES_BASE - (index + caseIndex * 9) * HOUR_IN_MS).toISOString(),
  }));
}

export function createCustomerDetails(customer: ICustomer): ICustomerDetails {
  const index = getCustomerIndex(customer);

  return {
    phone: `+1 555 01${String(index % 100).padStart(2, '0')}`,
    address: `${STREETS[index % STREETS.length]}, ${customer.country}`,
    notes: NOTES[index % NOTES.length],
    recentCases: createRecentCases(customer, index),
  };
}
