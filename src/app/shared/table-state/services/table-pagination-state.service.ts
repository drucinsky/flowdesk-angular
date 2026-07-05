import { Injectable, effect, inject, signal } from '@angular/core';

import { TABLE_STATE_CONFIG } from '../tokens/table-state.tokens';
import { TableStorageService } from './table-storage.service';

@Injectable()
export class TablePaginationStateService {
  private readonly _config = inject(TABLE_STATE_CONFIG);
  private readonly _storage = inject(TableStorageService);

  readonly pageIndex = signal(this._storage.getFromSession('pageIndex', 1));
  readonly pageSize = signal(this._storage.getFromLocal('pageSize', this._config.defaultPageSize));

  constructor() {
    effect(() => {
      this._storage.saveInSession('pageIndex', this.pageIndex());
    });

    effect(() => {
      this._storage.saveInLocal('pageSize', this.pageSize());
    });
  }

  setPageIndex(pageIndex: number): void {
    this.pageIndex.set(pageIndex);
  }

  setPageSize(pageSize: number): void {
    this.pageSize.set(pageSize);
    this.resetPageIndex();
  }

  resetPageIndex(): void {
    this.pageIndex.set(1);
  }
}
