import { DestroyRef, type Signal, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { type FieldTree, type SchemaOrSchemaFn, form } from '@angular/forms/signals';
import { NzMessageService } from 'ng-zorro-antd/message';
import { type Observable, finalize } from 'rxjs';

import { injectTableInlineEdit } from '../features/inline-edit/with-inline-edit.feature';
import { TableSelectionState } from '../features/selection/table-selection-state.service';
import { injectTableState } from '../table-state.feature';

export interface ITableRowEditOptions<TRow, TValue extends object> {
  readonly rowId: (row: TRow) => string;
  /** Initial value of the form, used until the first row is edited. */
  readonly emptyValue: TValue;
  readonly schema: SchemaOrSchemaFn<TValue>;
  readonly toValue: (row: TRow) => TValue;
  readonly isUnchanged: (row: TRow, value: TValue) => boolean;
  /** Saves the value and returns the updated row. */
  readonly save: (row: TRow, value: TValue) => Observable<TRow>;
  readonly savedMessage: (row: TRow) => string;
  readonly errorMessage: string;
}

export interface ITableRowEdit<TRow, TValue extends object> {
  readonly form: FieldTree<TValue>;
  readonly isSaving: Signal<boolean>;
  /** Emits (a new object each time) when the user saved or cancelled an edit; not when it was cancelled automatically. */
  readonly editEnded: Signal<{ readonly rowId: string } | null>;
  isEditing(row: TRow): boolean;
  start(row: TRow): void;
  cancel(): void;
  save(): void;
}

/**
 * Inline edit of a single table row: form, validation, saving and the keyboard-focus signal.
 * Requires `withInlineEdit()`; the selection (`withSelection()`) is optional and kept in sync with the saved row.
 */
export function injectTableRowEdit<TRow, TValue extends object>(options: ITableRowEditOptions<TRow, TValue>): ITableRowEdit<TRow, TValue> {
  const table = injectTableState<TRow, object>();
  const inlineEdit = injectTableInlineEdit<TRow>();
  const selection = inject(TableSelectionState, { optional: true }) as TableSelectionState<TRow> | null;
  const message = inject(NzMessageService);
  const destroyRef = inject(DestroyRef);

  const value = signal<TValue>(options.emptyValue);
  const editForm = form(value, options.schema);
  const isSaving = signal(false);
  const editEnded = signal<{ readonly rowId: string } | null>(null);

  function finish(): void {
    const row = inlineEdit.editingRow();

    inlineEdit.stop();

    if (row !== null) {
      editEnded.set({ rowId: options.rowId(row) });
    }
  }

  function start(row: TRow): void {
    if (isSaving()) {
      return;
    }

    value.set(options.toValue(row));
    inlineEdit.start(row);
  }

  function cancel(): void {
    if (!isSaving()) {
      finish();
    }
  }

  function save(): void {
    const row = inlineEdit.editingRow();

    if (row === null || isSaving() || !editForm().valid()) {
      return;
    }

    const update = value();

    if (options.isUnchanged(row, update)) {
      finish();
      return;
    }

    isSaving.set(true);

    options
      .save(row, update)
      .pipe(
        finalize(() => {
          isSaving.set(false);
        }),
        takeUntilDestroyed(destroyRef),
      )
      .subscribe({
        next: (updatedRow) => {
          // Selection keeps whole rows, so a selected row would otherwise stay stale (e.g. in the CSV export).
          if (selection?.isSelected(row)) {
            selection.toggle(updatedRow, true);
          }

          finish();
          table.refresh();
          message.success(options.savedMessage(row));
        },
        error: () => {
          message.error(options.errorMessage);
        },
      });
  }

  return {
    form: editForm,
    isSaving: isSaving.asReadonly(),
    editEnded: editEnded.asReadonly(),
    isEditing: (row) => inlineEdit.isEditing(row),
    start,
    cancel,
    save,
  };
}
