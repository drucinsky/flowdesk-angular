export interface ICustomerRecentCase {
  readonly id: string;
  readonly title: string;
  readonly status: string;
  readonly updatedAt: string;
}

export interface ICustomerDetails {
  readonly phone: string;
  readonly address: string;
  readonly notes: string;
  readonly recentCases: readonly ICustomerRecentCase[];
}

export interface ICustomerRecentCaseView {
  readonly id: string;
  readonly title: string;
  readonly status: string;
  readonly updatedAt: string;
}

export interface ICustomerDetailsView {
  readonly phone: string;
  readonly address: string;
  readonly notes: string;
  readonly recentCases: readonly ICustomerRecentCaseView[];
}
