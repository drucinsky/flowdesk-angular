import { Service, inject } from '@angular/core';
import { type Observable, map } from 'rxjs';

import { AppModalService } from './app-modal.service';
import { CONFIRM_MODAL } from './confirm-modal/confirm-modal.definition';
import type { IConfirmModalData } from './confirm-modal/confirm-modal.types';

@Service()
export class ConfirmDialogService {
  private readonly _modal = inject(AppModalService);

  /**
   * Emits `true` when the user confirms and `false` when the dialog is dismissed.
   * Completes without a value when another modal blocks opening it.
   */
  confirm(data: IConfirmModalData): Observable<boolean> {
    return this._modal.open(CONFIRM_MODAL, data, { title: data.title }).pipe(map((result) => result?.confirmed === true));
  }
}
