import { Injectable, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, map, type Observable } from 'rxjs';

import { CasesService } from '../../data-access/cases.service';
import { type ICloseCaseModalData, type ICloseCaseModalResult } from './close-case-modal.types';

@Injectable()
export class CloseCaseModalFacade {
  private readonly _casesService = inject(CasesService);

  readonly loading = signal(false);

  readonly form = new FormGroup({
    reason: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(5)],
    }),
    notifyClient: new FormControl(true, {
      nonNullable: true,
    }),
  });

  closeCase(data: ICloseCaseModalData): Observable<ICloseCaseModalResult> {
    const formValue = this.form.getRawValue();

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
