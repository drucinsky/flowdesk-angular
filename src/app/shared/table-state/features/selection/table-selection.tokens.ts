import { InjectionToken } from '@angular/core';

import type { ITableSelectionOptions } from './table-selection-options.interface';

export const TABLE_SELECTION_OPTIONS = new InjectionToken<ITableSelectionOptions<unknown>>('TABLE_SELECTION_OPTIONS');
