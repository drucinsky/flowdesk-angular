export type TableExportScope = 'page' | 'all' | 'selected';

export interface IExportScopeModalData {
  readonly pageCount: number;
  readonly totalCount: number;
  readonly selectedCount: number;
  readonly maxRows: number;
}

export interface IExportScopeModalResult {
  readonly scope: TableExportScope;
}

export interface IExportScopeFormValue {
  readonly scope: TableExportScope;
}
