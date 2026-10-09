import { Injectable, effect, inject, signal } from '@angular/core';

import type { ITableSort } from '../models/table-sort.interface';
import { injectTableConfig } from '../table-state-config.feature';
import { TableStorageService } from './table-storage.service';

@Injectable()
export class TableSortStateService<TSortKey extends string = string> {
  private readonly _config = injectTableConfig<unknown, object, TSortKey>();
  private readonly _storage = inject(TableStorageService);

  readonly sort = signal<ITableSort<TSortKey> | null>(
    this._storage.getFromSession<ITableSort<TSortKey> | null>('sort', this._config.defaultSort ?? null),
  );

  constructor() {
    effect(() => {
      this._storage.saveInSession('sort', this.sort());
    });
  }

  setSort(sort: ITableSort<TSortKey> | null): void {
    this.sort.set(sort);
  }

  resetSort(): void {
    this.sort.set(this._config.defaultSort ?? null);
  }
}
