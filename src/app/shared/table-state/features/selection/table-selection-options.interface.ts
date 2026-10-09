export interface ITableSelectionOptions<TRow> {
  /** Stable unique key of a row, used to keep the selection between pages. */
  readonly rowKey: (row: TRow) => string;
  /** Rows that cannot be selected (their checkbox is disabled and they are skipped by "select page"). */
  readonly isRowSelectable?: (row: TRow) => boolean;
  /** When to drop the selection automatically. Defaults to `'filters'`. */
  readonly clearOn?: 'filters' | 'never';
}
