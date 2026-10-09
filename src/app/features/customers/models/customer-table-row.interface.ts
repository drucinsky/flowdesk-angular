import { type CustomerStatus } from './customer-status.enum';

export interface ICustomerTableTag {
  readonly label: string;
  readonly color: string;
}

export interface ICustomerTableRow {
  readonly id: string;
  readonly initials: string;
  readonly company: string;
  readonly contactName: string;
  readonly email: string;
  readonly country: string;
  readonly plan: ICustomerTableTag;
  readonly status: ICustomerTableTag;
  readonly statusValue: CustomerStatus;
  readonly owner: string;
  readonly openCases: number;
  readonly mrr: string;
  readonly lastActivityAt: string;
}
