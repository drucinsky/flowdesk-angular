export interface ICustomerDeleteFailure {
  readonly id: string;
  readonly reason: string;
}

export interface ICustomersDeleteResult {
  readonly deletedIds: readonly string[];
  readonly failed: readonly ICustomerDeleteFailure[];
}
