import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { injectModal } from '../composables/modal.composable';
import type { IConfirmModalData, IConfirmModalResult } from './confirm-modal.types';

@Component({
  selector: 'fd-confirm-modal',
  imports: [NzButtonModule],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss',
})
export class ConfirmModalComponent {
  private readonly _modal = injectModal<IConfirmModalData, IConfirmModalResult>();

  protected readonly data = this._modal.data;

  protected cancel(): void {
    this._modal.close();
  }

  protected confirm(): void {
    this._modal.close({ confirmed: true });
  }
}
