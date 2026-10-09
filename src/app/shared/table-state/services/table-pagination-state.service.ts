import { Injectable, effect, inject, signal } from '@angular/core';

import { injectTableConfig } from '../table-state-config.feature';
import { TableStorageService } from './table-storage.service';

@Injectable()
export class TablePaginationStateService {
  private readonly _config = injectTableConfig();
  private readonly _storage = inject(TableStorageService);

  readonly pageIndex = signal(positiveIntegerOr(this._storage.getFromSession<unknown>('pageIndex', 1), 1));
  readonly pageSize = signal(
    positiveIntegerOr(this._storage.getFromLocal<unknown>('pageSize', this._config.defaultPageSize), this._config.defaultPageSize),
  );

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

function positiveIntegerOr(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isInteger(value) && value > 0 ? value : fallback;
}
