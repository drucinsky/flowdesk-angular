import { Injectable, effect, inject, signal, untracked } from '@angular/core';

import { injectOnTableFiltersChange } from '../../table-filters-change.feature';
import { injectTableState } from '../../table-state.feature';
import type { ITableInlineEditOptions } from './table-inline-edit-options.interface';
import { TABLE_INLINE_EDIT_OPTIONS } from './table-inline-edit.tokens';

/**
 * Tracks which row of the table is being edited (one row at a time). It holds only the "which row" state;
 * the editor UI, the form and saving belong to the screen that uses it.
 */
@Injectable()
export class TableInlineEditState<TRow> {
  private readonly _options = inject(TABLE_INLINE_EDIT_OPTIONS) as unknown as ITableInlineEditOptions<TRow>;
  private readonly _table = injectTableState<TRow, object>();

  private readonly _editingRow = signal<TRow | null>(null);

  readonly editingRow = this._editingRow.asReadonly();

  private readonly _cancelWhenRowLeavesPage = effect(() => {
    const items = this._table.items();
    const editingRow = untracked(this._editingRow);

    if (editingRow === null) {
      return;
    }

    const editingKey = this._options.rowKey(editingRow);

    if (!items.some((row) => this._options.rowKey(row) === editingKey)) {
      this.stop();
    }
  });

  private readonly _cancelOnFiltersChange = injectOnTableFiltersChange(() => {
    if ((this._options.cancelOn ?? 'filters') === 'filters') {
      this.stop();
    }
  });

  isEditing(row: TRow): boolean {
    const editingRow = this._editingRow();

    return editingRow !== null && this._options.rowKey(editingRow) === this._options.rowKey(row);
  }

  /** Starts editing the row. Editing another row cancels the current one. */
  start(row: TRow): void {
    this._editingRow.set(row);
  }

  stop(): void {
    this._editingRow.set(null);
  }
}
