import { Service, inject } from '@angular/core';
import { type Observable, EMPTY } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import type { IAppModalDefinition } from './modal.definition';
import { ModalRegistryService } from './modal-registry.service';

@Service()
export class AppModalService {
  private readonly _nzModal = inject(NzModalService);
  private readonly _message = inject(NzMessageService);
  private readonly _registry = inject(ModalRegistryService);

  /**
   * Opens the modal. Emits the result when the modal is closed with one and `undefined` when it is dismissed.
   * Completes without a value when another modal blocks opening it.
   */
  open<TData, TResult>(definition: IAppModalDefinition<TData, TResult>, data: TData): Observable<TResult | undefined> {
    const blockingKey = this._registry.getBlockingKey(definition.key, definition.dependencies);

    if (blockingKey) {
      this._message.info('Another modal is already open. Close it before continuing.');
      return EMPTY;
    }

    const ref = this._nzModal.create<unknown, TData, TResult>({
      nzContent: definition.component,
      nzData: data,
      nzTitle: typeof definition.title === 'function' ? definition.title(data) : definition.title,
      nzWidth: definition.width ?? 720,
      nzClassName: definition.className,
      nzClosable: definition.closable ?? true,
      nzMaskClosable: definition.maskClosable ?? false,
      nzFooter: null,
    });

    this._registry.register(definition.key, ref);

    return ref.afterClose;
  }
}
