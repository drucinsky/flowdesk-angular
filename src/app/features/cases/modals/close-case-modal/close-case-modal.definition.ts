import { type IAppModalDefinition } from '../../../../shared/modal/modal.definition';
import { CloseCaseModalComponent } from './close-case-modal.component';
import { type ICloseCaseModalData, type ICloseCaseModalResult } from './close-case-modal.types';

export const CLOSE_CASE_MODAL: IAppModalDefinition<ICloseCaseModalData, ICloseCaseModalResult> = {
  key: 'cases.close-case',
  component: CloseCaseModalComponent,
  title: 'Close case',
  width: 720,
  className: 'fd-close-case-modal',
  maskClosable: false,
};
