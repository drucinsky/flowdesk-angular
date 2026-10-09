export interface ITableRowExpansionOptions<TRow> {
  /** Stable unique key of a row. */
  readonly rowKey: (row: TRow) => string;
  /** `multiple` lets many rows stay expanded, `single` keeps only one (accordion). Defaults to `multiple`. */
  readonly mode?: 'multiple' | 'single';
  /** When to collapse all rows automatically. Defaults to `'filters'`. */
  readonly collapseOn?: 'filters' | 'never';
}
