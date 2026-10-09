import { inject } from '@angular/core';

import type { ITableFeature } from '../../models/table-feature.interface';
import { TableSelectionState } from './table-selection-state.service';
import type { ITableSelectionOptions } from './table-selection-options.interface';
import { TABLE_SELECTION_OPTIONS } from './table-selection.tokens';

/**
 * Adds row selection (kept between pages, cleared when filters change) to a table.
 * After an action that changes the data, call `table.refresh()` and `selection.clear()`.
 */
export function withSelection<TRow>(options: ITableSelectionOptions<TRow>): ITableFeature {
  return {
    name: 'selection',
    providers: [
      {
        provide: TABLE_SELECTION_OPTIONS,
        useValue: options,
      },
      TableSelectionState,
    ],
  };
}

export function injectTableSelection<TRow>(): TableSelectionState<TRow> {
  return inject(TableSelectionState) as TableSelectionState<TRow>;
}
