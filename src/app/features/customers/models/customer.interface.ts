import { type CustomerPlan } from './customer-plan.enum';
import { type CustomerStatus } from './customer-status.enum';

export interface ICustomer {
  readonly id: string;
  readonly company: string;
  readonly contactName: string;
  readonly email: string;
  readonly country: string;
  readonly plan: CustomerPlan;
  readonly status: CustomerStatus;
  readonly owner: string;
  readonly openCases: number;
  readonly mrr: number;
  readonly lastActivityAt: string;
  readonly createdAt: string;
}
