import { debounce, schema } from '@angular/forms/signals';

import { DEFAULT_TABLE_FILTERS_DEBOUNCE_MS } from '../../../../shared/table-state/config/table-default.config';
import type { ICaseFilters } from '../../models/case-filters.interface';

export const CASES_FILTERS_SCHEMA = schema<ICaseFilters>((path) => {
  debounce(path.search, DEFAULT_TABLE_FILTERS_DEBOUNCE_MS);
});
