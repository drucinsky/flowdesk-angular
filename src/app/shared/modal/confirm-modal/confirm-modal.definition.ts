import type { IAppModalDefinition } from '../modal.definition';
import { ConfirmModalComponent } from './confirm-modal.component';
import type { IConfirmModalData, IConfirmModalResult } from './confirm-modal.types';

export const CONFIRM_MODAL: IAppModalDefinition<IConfirmModalData, IConfirmModalResult> = {
  key: 'shared.confirm',
  component: ConfirmModalComponent,
  title: 'Confirm',
  width: 440,
  className: 'fd-confirm-modal',
  maskClosable: false,
};
