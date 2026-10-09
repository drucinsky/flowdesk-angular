import { Injectable, computed, inject, signal } from '@angular/core';

import { injectOnTableFiltersChange } from '../../table-filters-change.feature';
import { injectTableState } from '../../table-state.feature';
import { TABLE_SELECTION_OPTIONS } from './table-selection.tokens';
import type { ITableSelectionOptions } from './table-selection-options.interface';

/**
 * Selection of table rows, kept between pages. Whole rows are stored (not only keys),
 * so actions such as export can use rows from pages that are not currently displayed.
 */
@Injectable()
export class TableSelectionState<TRow> {
  private readonly _options = inject(TABLE_SELECTION_OPTIONS) as unknown as ITableSelectionOptions<TRow>;
  private readonly _table = injectTableState<TRow, object>();

  private readonly _selectedRows = signal<ReadonlyMap<string, TRow>>(new Map());

  readonly selectedRows = computed<readonly TRow[]>(() => [...this._selectedRows().values()]);
  readonly count = computed(() => this._selectedRows().size);
  readonly hasSelection = computed(() => this.count() > 0);

  private readonly _selectablePageRows = computed(() => this._table.items().filter((row) => this.isSelectable(row)));

  readonly isPageAllSelected = computed(() => {
    const rows = this._selectablePageRows();

    return rows.length > 0 && rows.every((row) => this.isSelected(row));
  });

  readonly isPageIndeterminate = computed(() => {
    const rows = this._selectablePageRows();
    const selectedCount = rows.filter((row) => this.isSelected(row)).length;

    return selectedCount > 0 && selectedCount < rows.length;
  });

  private readonly _clearOnFiltersChange = injectOnTableFiltersChange(() => {
    if ((this._options.clearOn ?? 'filters') === 'filters') {
      this.clear();
    }
  });

  isSelected(row: TRow): boolean {
    return this._selectedRows().has(this._options.rowKey(row));
  }

  isSelectable(row: TRow): boolean {
    return this._options.isRowSelectable?.(row) ?? true;
  }

  toggle(row: TRow, checked: boolean): void {
    this._selectedRows.update((current) => {
      const next = new Map(current);
      const key = this._options.rowKey(row);

      if (checked) {
        next.set(key, row);
      } else {
        next.delete(key);
      }

      return next;
    });
  }

  togglePage(checked: boolean): void {
    this._selectedRows.update((current) => {
      const next = new Map(current);

      for (const row of this._selectablePageRows()) {
        const key = this._options.rowKey(row);

        if (checked) {
          next.set(key, row);
        } else {
          next.delete(key);
        }
      }

      return next;
    });
  }

  deselect(rows: readonly TRow[]): void {
    this._selectedRows.update((current) => {
      const next = new Map(current);

      for (const row of rows) {
        next.delete(this._options.rowKey(row));
      }

      return next;
    });
  }

  clear(): void {
    this._selectedRows.set(new Map());
  }
}
