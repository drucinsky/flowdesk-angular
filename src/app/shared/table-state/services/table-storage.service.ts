import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

import { injectTableConfig } from '../table-state-config.feature';

@Injectable()
export class TableStorageService {
  private readonly _config = injectTableConfig();
  private readonly _window = inject(DOCUMENT).defaultView;

  getFromSession<TValue>(key: string, fallback: TValue): TValue {
    return this._getValue(() => this._window?.sessionStorage, key, fallback);
  }

  saveInSession<TValue>(key: string, value: TValue): void {
    this._setValue(() => this._window?.sessionStorage, key, value);
  }

  getFromLocal<TValue>(key: string, fallback: TValue): TValue {
    return this._getValue(() => this._window?.localStorage, key, fallback);
  }

  saveInLocal<TValue>(key: string, value: TValue): void {
    this._setValue(() => this._window?.localStorage, key, value);
  }

  // Storage can be missing or throw (SSR, blocked site data, private mode, quota), so every access is guarded.
  private _getValue<TValue>(getStorage: () => Storage | undefined, key: string, fallback: TValue): TValue {
    try {
      const value = getStorage()?.getItem(this._getStorageKey(key));

      return value ? (JSON.parse(value) as TValue) : fallback;
    } catch {
      return fallback;
    }
  }

  private _setValue<TValue>(getStorage: () => Storage | undefined, key: string, value: TValue): void {
    try {
      getStorage()?.setItem(this._getStorageKey(key), JSON.stringify(value));
    } catch {
      // Persisting table state is best effort.
    }
  }

  private _getStorageKey(key: string): string {
    return `flowdesk.table.${this._config.key}.${key}`;
  }
}
