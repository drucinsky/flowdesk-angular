import type { ICustomerDetails, ICustomerDetailsView } from '../models/customer-details.interface';

const RECENT_CASE_DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
});

export function mapCustomerDetailsToView(details: ICustomerDetails): ICustomerDetailsView {
  return {
    ...details,
    recentCases: details.recentCases.map((recentCase) => ({
      ...recentCase,
      updatedAt: RECENT_CASE_DATE_FORMATTER.format(new Date(recentCase.updatedAt)),
    })),
  };
}
