import { effect, inject } from '@angular/core';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

export interface IModalOptions {
  /**
   * While it returns `true` the modal cannot be closed by the user (Esc, mask, close button).
   * Read lazily, so it may reference fields declared after the `injectModal()` call.
   */
  readonly isBusy?: () => boolean;
}

export interface IModal<TData, TResult> {
  /** The data passed to `AppModalService.open()`. */
  readonly data: TData;
  /** Closes the modal; the result (if any) is emitted by `open()`. Closing without a result means the modal was dismissed. */
  close(result?: TResult): void;
}

/**
 * Access to the modal that hosts the calling component or service (a facade provided by the modal component).
 */
export function injectModal<TData, TResult = never>(options: IModalOptions = {}): IModal<TData, TResult> {
  const modalRef = inject<NzModalRef<unknown, TResult>>(NzModalRef);
  const data = inject<TData>(NZ_MODAL_DATA);

  const { isBusy } = options;

  if (isBusy) {
    // nzOkLoading also makes NzModal ignore the Esc key and mask clicks while the request is pending.
    effect(() => {
      const busy = isBusy();

      modalRef.updateConfig({
        nzOkLoading: busy,
        nzClosable: !busy,
      });
    });
  }

  return {
    data,
    close: (result) => {
      modalRef.close(result);
    },
  };
}
