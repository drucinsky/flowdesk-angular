import { type CustomerPlan } from './customer-plan.enum';
import { type CustomerStatus } from './customer-status.enum';

export interface ICustomerFilters {
  readonly search: string;
  readonly status: CustomerStatus | null;
  readonly plan: CustomerPlan | null;
  readonly owner: string | null;
  readonly country: string | null;
}

export const DEFAULT_CUSTOMER_FILTERS: ICustomerFilters = {
  search: '',
  status: null,
  plan: null,
  owner: null,
  country: null,
};
