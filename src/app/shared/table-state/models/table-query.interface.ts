import type { ITableSort } from './table-sort.interface';

export interface ITableQuery<TFilters extends object, TSortKey extends string = string> {
  readonly filters: TFilters;
  readonly pageIndex: number;
  readonly pageSize: number;
  readonly sort: ITableSort<TSortKey> | null;
}
