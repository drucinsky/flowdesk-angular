import { debounce, schema } from '@angular/forms/signals';

import { DEFAULT_TABLE_FILTERS_DEBOUNCE_MS } from '../../../../shared/table-state/config/table-default.config';
import type { ICustomerFilters } from '../../models/customer-filters.interface';

export const CUSTOMERS_FILTERS_SCHEMA = schema<ICustomerFilters>((path) => {
  debounce(path.search, DEFAULT_TABLE_FILTERS_DEBOUNCE_MS);
});
