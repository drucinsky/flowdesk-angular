import { minLength, required, schema } from '@angular/forms/signals';

import { type ICloseCaseFormValue } from './close-case-modal.types';

export const CLOSE_REASON_MIN_LENGTH = 5;

export const CLOSE_CASE_FORM_SCHEMA = schema<ICloseCaseFormValue>((path) => {
  required(path.reason);
  minLength(path.reason, CLOSE_REASON_MIN_LENGTH);
});
