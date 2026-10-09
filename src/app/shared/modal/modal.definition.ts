import type { Type } from '@angular/core';

export interface IAppModalDefinition<TData, TResult> {
  readonly _dataType?: TData;
  readonly _resultType?: TResult;
  readonly key: string;
  readonly component: Type<unknown>;
  readonly title?: string;
  readonly width?: string | number;
  readonly className?: string;
  readonly dependencies?: readonly string[];
  readonly closable?: boolean;
  readonly maskClosable?: boolean;
}
