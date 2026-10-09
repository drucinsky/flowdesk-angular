import { computed, effect, untracked } from '@angular/core';

import { areFiltersEqual } from './filters/table-filters.util';
import { injectTableState } from './table-state.feature';

/**
 * Runs the callback whenever the table filters change their value (not on the initial value
 * and not when the same filters are set again).
 */
export function injectOnTableFiltersChange(callback: () => void): void {
  const table = injectTableState<unknown, object>();
  const filters = computed(() => table.filters(), { equal: areFiltersEqual });
  let isInitialized = false;

  effect(() => {
    filters();

    if (!isInitialized) {
      isInitialized = true;
      return;
    }

    untracked(callback);
  });
}
