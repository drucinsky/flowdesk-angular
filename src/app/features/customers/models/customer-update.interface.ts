import { type CustomerPlan } from './customer-plan.enum';

/** Fields of a customer that can be changed with inline edit. */
export interface ICustomerUpdate {
  readonly plan: CustomerPlan;
  readonly owner: string;
}
