import { Injectable, inject, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { finalize, map, type Observable } from 'rxjs';

import { CasesService } from '../../data-access/cases.service';
import { CLOSE_CASE_FORM_SCHEMA } from './close-case-modal.schema';
import { type ICloseCaseFormValue, type ICloseCaseModalData, type ICloseCaseModalResult } from './close-case-modal.types';

@Injectable()
export class CloseCaseModalFacade {
  private readonly _casesService = inject(CasesService);

  readonly loading = signal(false);

  private readonly _formValue = signal<ICloseCaseFormValue>({
    reason: '',
    notifyClient: true,
  });

  readonly form = form(this._formValue, CLOSE_CASE_FORM_SCHEMA);

  closeCase(data: ICloseCaseModalData): Observable<ICloseCaseModalResult> {
    const formValue = this._formValue();

    this.loading.set(true);

    return this._casesService.closeCase(data.caseId, formValue.reason, formValue.notifyClient).pipe(
      map((closedCase) => ({
        closed: true,
        caseId: closedCase.id,
      })),
      finalize(() => {
        this.loading.set(false);
      }),
    );
  }
}
