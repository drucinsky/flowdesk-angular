import { required, schema } from '@angular/forms/signals';

import type { ICustomerUpdate } from './models/customer-update.interface';

export const CUSTOMER_EDIT_SCHEMA = schema<ICustomerUpdate>((path) => {
  required(path.plan);
  required(path.owner);
});
