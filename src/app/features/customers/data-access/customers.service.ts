import { Service } from '@angular/core';
import { delay, of, throwError, type Observable } from 'rxjs';

import type { ITableDataResult } from '../../../shared/table-state/models/table-data-result.interface';
import type { ITableQuery } from '../../../shared/table-state/models/table-query.interface';
import { type TableSortValue, paginateTableItems, sortTableItems } from '../../../shared/table-state/utils/mock-table-query.util';
import type { ICustomersDeleteResult } from '../models/customers-delete-result.interface';
import type { ICustomerDetails } from '../models/customer-details.interface';
import type { ICustomerFilters } from '../models/customer-filters.interface';
import type { CustomerSortKey } from '../models/customer-sort-key.type';
import type { ICustomer } from '../models/customer.interface';
import { createCustomerDetails } from './customer-details.mock';
import { CUSTOMERS_MOCK_DATA } from './customers.mock';

const SORT_VALUE_GETTERS: Record<CustomerSortKey, (customer: ICustomer) => TableSortValue> = {
  company: (customer) => customer.company.toLowerCase(),
  plan: (customer) => customer.plan,
  status: (customer) => customer.status,
  owner: (customer) => customer.owner.toLowerCase(),
  country: (customer) => customer.country,
  openCases: (customer) => customer.openCases,
  mrr: (customer) => customer.mrr,
  lastActivityAt: (customer) => Date.parse(customer.lastActivityAt),
};

/**
 * Simulates a backend table endpoint for static mock data.
 * With a real API, this service would only send the table query and return the paginated response.
 */
@Service()
export class CustomersService {
  private _customers: readonly ICustomer[] = CUSTOMERS_MOCK_DATA;

  getCustomersData(query: ITableQuery<ICustomerFilters, CustomerSortKey>): Observable<ITableDataResult<ICustomer>> {
    const filteredCustomers = this._filterCustomers(this._customers, query.filters);
    const sortedCustomers = sortTableItems(filteredCustomers, query.sort, SORT_VALUE_GETTERS);
    const paginatedCustomers = paginateTableItems(sortedCustomers, query.pageIndex, query.pageSize);

    return of({
      items: paginatedCustomers,
      total: filteredCustomers.length,
    }).pipe(delay(350));
  }

  getCustomerDetails(customerId: string): Observable<ICustomerDetails> {
    const customer = this._customers.find((item) => item.id === customerId);

    if (!customer) {
      return throwError(() => new Error(`Customer ${customerId} was not found.`));
    }

    return of(createCustomerDetails(customer)).pipe(delay(400));
  }

  /**
   * Mocked bulk delete. A customer with open cases cannot be deleted, so partial failures are part of the contract.
   */
  deleteCustomers(customerIds: readonly string[]): Observable<ICustomersDeleteResult> {
    const deletedIds: string[] = [];
    const failed: { id: string; reason: string }[] = [];

    for (const id of customerIds) {
      const customer = this._customers.find((item) => item.id === id);

      if (!customer) {
        failed.push({ id, reason: 'Customer was not found.' });
      } else if (customer.openCases > 0) {
        failed.push({ id, reason: 'Customer has open cases.' });
      } else {
        deletedIds.push(id);
      }
    }

    this._customers = this._customers.filter((customer) => !deletedIds.includes(customer.id));

    return of({ deletedIds, failed }).pipe(delay(600));
  }

  private _filterCustomers(customers: readonly ICustomer[], filters: ICustomerFilters): readonly ICustomer[] {
    const search = filters.search.trim().toLowerCase();

    return customers.filter((customer) => {
      const matchesSearch =
        !search ||
        customer.id.toLowerCase().includes(search) ||
        customer.company.toLowerCase().includes(search) ||
        customer.contactName.toLowerCase().includes(search) ||
        customer.email.toLowerCase().includes(search);

      const matchesStatus = !filters.status || customer.status === filters.status;
      const matchesPlan = !filters.plan || customer.plan === filters.plan;
      const matchesOwner = !filters.owner || customer.owner === filters.owner;
      const matchesCountry = !filters.country || customer.country === filters.country;

      return matchesSearch && matchesStatus && matchesPlan && matchesOwner && matchesCountry;
    });
  }
}
