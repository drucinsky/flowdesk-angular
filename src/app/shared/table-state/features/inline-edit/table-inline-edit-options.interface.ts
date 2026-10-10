export interface ITableInlineEditOptions<TRow> {
  /** Stable unique key of a row. */
  readonly rowKey: (row: TRow) => string;
  /** When to cancel the edit automatically (the edited row also gets cancelled when it leaves the page). Defaults to `'filters'`. */
  readonly cancelOn?: 'filters' | 'never';
}
