import { inject } from '@angular/core';

import type { ITableFeature } from '../../models/table-feature.interface';
import { TableRowExpansionState } from './table-row-expansion-state.service';
import type { ITableRowExpansionOptions } from './table-row-expansion-options.interface';
import { TABLE_ROW_EXPANSION_OPTIONS } from './table-row-expansion.tokens';

/**
 * Adds expandable rows to a table. The expanded content is rendered by the table itself
 * (render it only for expanded rows to load details lazily).
 */
export function withRowExpansion<TRow>(options: ITableRowExpansionOptions<TRow>): ITableFeature {
  return {
    name: 'row-expansion',
    providers: [
      {
        provide: TABLE_ROW_EXPANSION_OPTIONS,
        useValue: options,
      },
      TableRowExpansionState,
    ],
  };
}

export function injectTableRowExpansion<TRow>(): TableRowExpansionState<TRow> {
  return inject(TableRowExpansionState) as TableRowExpansionState<TRow>;
}
