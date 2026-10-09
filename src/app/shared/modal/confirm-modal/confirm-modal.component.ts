import { Component, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

import type { IConfirmModalData, IConfirmModalResult } from './confirm-modal.types';

@Component({
  selector: 'fd-confirm-modal',
  imports: [NzButtonModule],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss',
})
export class ConfirmModalComponent {
  private readonly _modalRef = inject<NzModalRef<unknown, IConfirmModalResult>>(NzModalRef);

  protected readonly data = inject<IConfirmModalData>(NZ_MODAL_DATA);

  protected cancel(): void {
    this._modalRef.close();
  }

  protected confirm(): void {
    this._modalRef.close({ confirmed: true });
  }
}
