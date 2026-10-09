import { Injectable, effect, inject, signal } from '@angular/core';

import { injectTableConfig } from '../table-state-config.feature';
import { TableStorageService } from './table-storage.service';

@Injectable()
export class TableFiltersStateService<TFilters extends object> {
  private readonly _config = injectTableConfig<unknown, TFilters>();
  private readonly _storage = inject(TableStorageService);

  readonly filters = signal<TFilters>({
    ...this._config.defaultFilters,
    ...this._storage.getFromSession<Partial<TFilters>>('filters', {}),
  });

  constructor() {
    effect(() => {
      this._storage.saveInSession('filters', this.filters());
    });
  }

  updateFilters(filters: Partial<TFilters>): void {
    this.filters.update((currentFilters) => ({
      ...currentFilters,
      ...filters,
    }));
  }

  resetFilters(): void {
    this.filters.set(this._config.defaultFilters);
  }
}
