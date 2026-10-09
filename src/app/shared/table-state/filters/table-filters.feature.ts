import { type ModelSignal, effect, inject, linkedSignal, untracked } from '@angular/core';
import { type FieldTree, type SchemaOrSchemaFn, form } from '@angular/forms/signals';

import type { ITableStateConfig } from '../models/table-state-config.interface';
import { TABLE_STATE_CONFIG } from '../tokens/table-state.tokens';
import { areFiltersEqual } from './table-filters.util';

export interface ITableFilters<TFilters extends object> {
  readonly form: FieldTree<TFilters>;
  reset(): void;
}

/**
 * Edits table filters with a signal form and keeps it in sync with the `filters` model of the host component.
 *
 * The form works on a draft that is reset whenever the model changes. A valid, changed draft is written back
 * to the model, which makes the host component emit `filtersChange`.
 * Per-field behavior (e.g. `debounce`) is configured through the optional schema.
 */
export function injectTableFilters<TFilters extends object>(
  filters: ModelSignal<TFilters>,
  schema?: SchemaOrSchemaFn<TFilters>,
): ITableFilters<TFilters> {
  const config = inject(TABLE_STATE_CONFIG) as ITableStateConfig<unknown, TFilters, string>;

  const draft = linkedSignal(() => filters());
  const filtersForm = schema ? form(draft, schema) : form(draft);

  effect(() => {
    const draftFilters = draft();

    if (!filtersForm().valid()) {
      return;
    }

    if (!areFiltersEqual(untracked(filters), draftFilters)) {
      filters.set(draftFilters);
    }
  });

  return {
    form: filtersForm,
    reset: () => {
      filters.set(config.defaultFilters);
    },
  };
}
