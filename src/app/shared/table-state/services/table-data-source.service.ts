import type { Observable } from 'rxjs';

import type { ITableDataResult } from '../models/table-data-result.interface';
import type { ITableQuery } from '../models/table-query.interface';

export abstract class TableDataSource<TRow, TFilters extends object, TSortKey extends string = string> {
  abstract getList(query: ITableQuery<TFilters, TSortKey>): Observable<ITableDataResult<TRow>>;
}
