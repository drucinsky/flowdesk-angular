import { Injectable, computed, inject, signal } from '@angular/core';

import { injectOnTableFiltersChange } from '../../table-filters-change.feature';
import type { ITableRowExpansionOptions } from './table-row-expansion-options.interface';
import { TABLE_ROW_EXPANSION_OPTIONS } from './table-row-expansion.tokens';

@Injectable()
export class TableRowExpansionState<TRow> {
  private readonly _options = inject(TABLE_ROW_EXPANSION_OPTIONS) as unknown as ITableRowExpansionOptions<TRow>;

  private readonly _expandedKeys = signal<ReadonlySet<string>>(new Set());

  readonly count = computed(() => this._expandedKeys().size);

  private readonly _collapseOnFiltersChange = injectOnTableFiltersChange(() => {
    if ((this._options.collapseOn ?? 'filters') === 'filters') {
      this.collapseAll();
    }
  });

  isExpanded(row: TRow): boolean {
    return this._expandedKeys().has(this._options.rowKey(row));
  }

  toggle(row: TRow, expanded: boolean): void {
    const key = this._options.rowKey(row);

    this._expandedKeys.update((current) => {
      const next = (this._options.mode ?? 'multiple') === 'single' ? new Set<string>() : new Set(current);

      if (expanded) {
        next.add(key);
      } else {
        next.delete(key);
      }

      return next;
    });
  }

  collapseAll(): void {
    this._expandedKeys.set(new Set());
  }
}
