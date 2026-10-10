import { CustomerPlan } from './customer-plan.enum';

export interface ICustomerPlanOption {
  readonly value: CustomerPlan;
  readonly label: string;
}

export const CUSTOMER_PLAN_OPTIONS: readonly ICustomerPlanOption[] = [
  { value: CustomerPlan.FREE, label: 'Free' },
  { value: CustomerPlan.PRO, label: 'Pro' },
  { value: CustomerPlan.ENTERPRISE, label: 'Enterprise' },
];
