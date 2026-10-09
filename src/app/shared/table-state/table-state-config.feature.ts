import { inject } from '@angular/core';

import type { ITableStateConfig } from './models/table-state-config.interface';
import type { TableDataSource } from './services/table-data-source.service';
import { TABLE_DATA_SOURCE, TABLE_STATE_CONFIG } from './tokens/table-state.tokens';

/**
 * Typed access to the table state config. The tokens are erased to `unknown` generics,
 * so the cast lives here, in a single place.
 */
export function injectTableConfig<TRow = unknown, TFilters extends object = object, TSortKey extends string = string>(): ITableStateConfig<
  TRow,
  TFilters,
  TSortKey
> {
  return inject(TABLE_STATE_CONFIG) as unknown as ITableStateConfig<TRow, TFilters, TSortKey>;
}

export function injectTableDataSource<TRow, TFilters extends object, TSortKey extends string = string>(): TableDataSource<
  TRow,
  TFilters,
  TSortKey
> {
  return inject(TABLE_DATA_SOURCE) as unknown as TableDataSource<TRow, TFilters, TSortKey>;
}
