import type { Provider } from '@angular/core';

/**
 * Optional table capability (selection, row expansion, ...) with its own state per table instance.
 * Features are created with `with*()` functions and passed to `provideTableState(config, ...features)`.
 */
export interface ITableFeature {
  readonly name: string;
  readonly providers: readonly Provider[];
}
