import { InjectionToken } from '@angular/core';

import type { ITableRowExpansionOptions } from './table-row-expansion-options.interface';

export const TABLE_ROW_EXPANSION_OPTIONS = new InjectionToken<ITableRowExpansionOptions<unknown>>('TABLE_ROW_EXPANSION_OPTIONS');
