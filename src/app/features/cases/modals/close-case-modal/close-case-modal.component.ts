import { Component, inject } from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';

import { CloseCaseModalFacade } from './close-case-modal.facade';
import { CLOSE_REASON_MIN_LENGTH } from './close-case-modal.schema';

@Component({
  selector: 'fd-close-case-modal',
  imports: [FormField, NzButtonModule, NzInputModule],
  templateUrl: './close-case-modal.component.html',
  styleUrl: './close-case-modal.component.scss',
  providers: [CloseCaseModalFacade],
})
export class CloseCaseModalComponent {
  protected readonly facade = inject(CloseCaseModalFacade);
  protected readonly data = this.facade.data;
  protected readonly closeReasonMinLength = CLOSE_REASON_MIN_LENGTH;
}
