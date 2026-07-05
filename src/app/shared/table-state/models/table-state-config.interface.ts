import type { Type } from '@angular/core';

import type { TableDataSource } from '../services/table-data-source.service';
import type { ITableSort } from './table-sort.interface';

export interface ITableScrollConfig {
  readonly x?: string;
  readonly y?: string;
}

export interface ITableStateConfig<TRow, TFilters extends object, TSortKey extends string = string> {
  readonly key: string;
  readonly defaultFilters: TFilters;
  readonly defaultPageSize: number;
  readonly defaultSort?: ITableSort<TSortKey> | null;
  readonly pageSizeOptions?: readonly number[];
  readonly scroll?: ITableScrollConfig;
  readonly dataSource: Type<TableDataSource<TRow, TFilters, TSortKey>>;
}
