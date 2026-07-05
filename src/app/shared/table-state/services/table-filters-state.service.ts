import { Injectable, effect, inject, signal } from '@angular/core';

import type { ITableStateConfig } from '../models/table-state-config.interface';
import { TABLE_STATE_CONFIG } from '../tokens/table-state.tokens';
import { TableStorageService } from './table-storage.service';

@Injectable()
export class TableFiltersStateService<TFilters extends object> {
  private readonly _config = inject(TABLE_STATE_CONFIG) as ITableStateConfig<unknown, TFilters, string>;
  private readonly _storage = inject(TableStorageService);

  readonly filters = signal<TFilters>(this._storage.getFromSession<TFilters>('filters', this._config.defaultFilters));

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
