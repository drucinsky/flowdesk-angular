import { DestroyRef, Injectable, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { form } from '@angular/forms/signals';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs';

import { injectModal } from '../../../../shared/modal/composables/modal.composable';
import { CasesService } from '../../data-access/cases.service';
import { CLOSE_CASE_FORM_SCHEMA } from './close-case-modal.schema';
import { type ICloseCaseFormValue, type ICloseCaseModalData, type ICloseCaseModalResult } from './close-case-modal.types';

@Injectable()
export class CloseCaseModalFacade {
  private readonly _casesService = inject(CasesService);
  private readonly _message = inject(NzMessageService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _modal = injectModal<ICloseCaseModalData, ICloseCaseModalResult>({ isBusy: () => this.loading() });

  readonly data = this._modal.data;
  readonly loading = signal(false);

  private readonly _formValue = signal<ICloseCaseFormValue>({
    reason: '',
    notifyClient: true,
  });

  readonly form = form(this._formValue, CLOSE_CASE_FORM_SCHEMA);

  cancel(): void {
    this._modal.close();
  }

  submit(): void {
    if (this.loading()) {
      return;
    }

    if (this.form().invalid()) {
      this.form().markAsTouched();
      return;
    }

    const { reason, notifyClient } = this._formValue();

    this.loading.set(true);

    this._casesService
      .closeCase(this.data.caseId, reason, notifyClient)
      .pipe(
        finalize(() => {
          this.loading.set(false);
        }),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe({
        next: (closedCase) => {
          this._modal.close({ closed: true, caseId: closedCase.id });
        },
        error: () => {
          this._message.error('Could not close the case. Please try again.');
        },
      });
  }
}
