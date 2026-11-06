import type { Type } from '@angular/core';

export interface IAppModalDefinition<TData, TResult> {
  /** Type-only markers that let `AppModalService.open()` infer the data and result types. Never set them. */
  readonly _dataType?: TData;
  readonly _resultType?: TResult;
  readonly key: string;
  readonly component: Type<unknown>;
  /** A fixed title or a function of the data passed to `open()`. */
  readonly title?: string | ((data: TData) => string);
  readonly width?: string | number;
  readonly className?: string;
  /** Keys of modals that must not be open at the same time as this one. */
  readonly dependencies?: readonly string[];
  readonly closable?: boolean;
  readonly maskClosable?: boolean;
}
