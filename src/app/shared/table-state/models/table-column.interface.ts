/**
 * Column of a table rendered by `fd-data-table`. The header (with sorting) comes from this definition,
 * the cell content from an `<ng-template fdTableCell="<key>">` projected into the table.
 */
export interface ITableColumn<TSortKey extends string = string> {
  readonly key: string;
  readonly header: string;
  readonly width: string;
  /** Makes the column sortable by this key. */
  readonly sortKey?: TSortKey;
  readonly align?: 'left' | 'right' | 'center';
  readonly fixed?: 'left' | 'right';
  /** Shows the header only to screen readers (e.g. the actions column). */
  readonly hideHeader?: boolean;
  readonly cellClass?: string;
}
