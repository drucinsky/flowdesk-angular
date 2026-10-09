import { inject } from '@angular/core';

import { TableDataFacade } from './facades/table-data.facade';

/**
 * Typed access to the table state facade provided by `provideTableState()`.
 */
export function injectTableState<TRow, TFilters extends object, TSortKey extends string = string>(): TableDataFacade<
  TRow,
  TFilters,
  TSortKey
> {
  return inject(TableDataFacade) as TableDataFacade<TRow, TFilters, TSortKey>;
}
