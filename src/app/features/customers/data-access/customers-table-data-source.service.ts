import { Injectable, inject } from '@angular/core';
import { map, type Observable } from 'rxjs';

import type { ITableDataResult } from '../../../shared/table-state/models/table-data-result.interface';
import type { ITableQuery } from '../../../shared/table-state/models/table-query.interface';
import { TableDataSource } from '../../../shared/table-state/services/table-data-source.service';
import { mapCustomerToTableRow } from '../mappers/customer-table-row.mapper';
import type { ICustomerFilters } from '../models/customer-filters.interface';
import type { CustomerSortKey } from '../models/customer-sort-key.type';
import type { ICustomerTableRow } from '../models/customer-table-row.interface';
import { CustomersService } from './customers.service';

@Injectable()
export class CustomersTableDataSource extends TableDataSource<ICustomerTableRow, ICustomerFilters, CustomerSortKey> {
  private readonly _customersService = inject(CustomersService);

  override getList(query: ITableQuery<ICustomerFilters, CustomerSortKey>): Observable<ITableDataResult<ICustomerTableRow>> {
    return this._customersService.getCustomersData(query).pipe(
      map((response) => ({
        items: response.items.map(mapCustomerToTableRow),
        total: response.total,
      })),
    );
  }
}
