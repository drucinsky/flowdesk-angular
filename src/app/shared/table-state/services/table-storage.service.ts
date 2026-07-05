import { Injectable, inject } from '@angular/core';

import { TABLE_STATE_CONFIG } from '../tokens/table-state.tokens';

@Injectable()
export class TableStorageService {
  private readonly _config = inject(TABLE_STATE_CONFIG);

  getFromSession<TValue>(key: string, fallback: TValue): TValue {
    return this._getValue(sessionStorage, key, fallback);
  }

  saveInSession<TValue>(key: string, value: TValue): void {
    this._setValue(sessionStorage, key, value);
  }

  getFromLocal<TValue>(key: string, fallback: TValue): TValue {
    return this._getValue(localStorage, key, fallback);
  }

  saveInLocal<TValue>(key: string, value: TValue): void {
    this._setValue(localStorage, key, value);
  }

  private _getValue<TValue>(storage: Storage, key: string, fallback: TValue): TValue {
    const value = storage.getItem(this._getStorageKey(key));

    if (!value) {
      return fallback;
    }

    try {
      return JSON.parse(value) as TValue;
    } catch {
      return fallback;
    }
  }

  private _setValue<TValue>(storage: Storage, key: string, value: TValue): void {
    storage.setItem(this._getStorageKey(key), JSON.stringify(value));
  }

  private _getStorageKey(key: string): string {
    return `flowdesk.table.${this._config.key}.${key}`;
  }
}
