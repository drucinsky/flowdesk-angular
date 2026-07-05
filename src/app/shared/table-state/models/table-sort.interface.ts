export enum TableSortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export interface ITableSort<TKey extends string = string> {
  readonly key: TKey;
  readonly direction: TableSortDirection;
}
