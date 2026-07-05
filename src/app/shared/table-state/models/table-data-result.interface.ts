export interface ITableDataResult<TRow> {
  readonly items: readonly TRow[];
  readonly total: number;
}
