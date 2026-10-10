import { inject } from '@angular/core';

import type { ITableFeature } from '../../models/table-feature.interface';
import { TableInlineEditState } from './table-inline-edit-state.service';
import type { ITableInlineEditOptions } from './table-inline-edit-options.interface';
import { TABLE_INLINE_EDIT_OPTIONS } from './table-inline-edit.tokens';

/**
 * Adds row-level inline edit (one row at a time, cancelled when filters change or the row leaves the page) to a table.
 * After a successful save, call `table.refresh()` and `inlineEdit.stop()`.
 */
export function withInlineEdit<TRow>(options: ITableInlineEditOptions<TRow>): ITableFeature {
  return {
    name: 'inline-edit',
    providers: [
      {
        provide: TABLE_INLINE_EDIT_OPTIONS,
        useValue: options,
      },
      TableInlineEditState,
    ],
  };
}

export function injectTableInlineEdit<TRow>(): TableInlineEditState<TRow> {
  return inject(TableInlineEditState) as TableInlineEditState<TRow>;
}
