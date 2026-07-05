import { Injectable, effect, inject, signal } from '@angular/core';

import type { ITableSort } from '../models/table-sort.interface';
import type { ITableStateConfig } from '../models/table-state-config.interface';
import { TABLE_STATE_CONFIG } from '../tokens/table-state.tokens';
import { TableStorageService } from './table-storage.service';

@Injectable()
export class TableSortStateService<TSortKey extends string = string> {
  private readonly _config = inject(TABLE_STATE_CONFIG) as ITableStateConfig<unknown, object, TSortKey>;
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
