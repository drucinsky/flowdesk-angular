import { Injectable, inject } from '@angular/core';
import { type Observable } from 'rxjs';

import { AppModalService } from '../../../../shared/modal/app-modal.service';
import { CLOSE_CASE_MODAL } from './close-case-modal.definition';
import { type ICloseCaseModalData, type ICloseCaseModalResult } from './close-case-modal.types';

@Injectable({
  providedIn: 'root',
})
export class CloseCaseModalService {
  private readonly _modal = inject(AppModalService);

  open(data: ICloseCaseModalData): Observable<ICloseCaseModalResult | undefined> {
    return this._modal.open(CLOSE_CASE_MODAL, data);
  }
}
