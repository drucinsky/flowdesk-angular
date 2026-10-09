import type { ICsvColumn } from '../../../shared/csv/csv.util';
import type { ICustomerTableRow } from '../models/customer-table-row.interface';

export const CUSTOMERS_EXPORT_COLUMNS: readonly ICsvColumn<ICustomerTableRow>[] = [
  { header: 'ID', value: (customer) => customer.id },
  { header: 'Company', value: (customer) => customer.company },
  { header: 'Contact', value: (customer) => customer.contactName },
  { header: 'Email', value: (customer) => customer.email },
  { header: 'Country', value: (customer) => customer.country },
  { header: 'Plan', value: (customer) => customer.plan.label },
  { header: 'Status', value: (customer) => customer.status.label },
  { header: 'Owner', value: (customer) => customer.owner },
  { header: 'Open cases', value: (customer) => customer.openCases },
  { header: 'MRR (USD)', value: (customer) => customer.mrrValue },
  { header: 'Last activity', value: (customer) => customer.lastActivityAtValue },
];
