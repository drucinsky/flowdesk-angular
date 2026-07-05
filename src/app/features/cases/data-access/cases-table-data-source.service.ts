import { Injectable, inject } from '@angular/core';
import { map, type Observable } from 'rxjs';

import { TableDataSource } from '../../../shared/table-state/services/table-data-source.service';
import type { ITableDataResult } from '../../../shared/table-state/models/table-data-result.interface';
import type { ITableQuery } from '../../../shared/table-state/models/table-query.interface';
import { CasesService } from './cases.service';
import type { ICaseFilters } from '../models/case-filters.interface';
import type { CaseSortKey } from '../models/case-sort-key.type';
import type { ICaseTableRow } from '../models/case-table-row.interface';
import { mapCaseToTableRow } from '../mappers/case-table-row.mapper';

@Injectable()
export class CasesTableDataSource extends TableDataSource<ICaseTableRow, ICaseFilters, CaseSortKey> {
  private readonly _casesService = inject(CasesService);

  override getList(query: ITableQuery<ICaseFilters, CaseSortKey>): Observable<ITableDataResult<ICaseTableRow>> {
    return this._casesService.getCasesData(query).pipe(
      map((response) => ({
        items: response.items.map(mapCaseToTableRow),
        total: response.total,
      })),
    );
  }
}
