import { InjectionToken } from '@angular/core';

import type { ITableInlineEditOptions } from './table-inline-edit-options.interface';

export const TABLE_INLINE_EDIT_OPTIONS = new InjectionToken<ITableInlineEditOptions<unknown>>('TABLE_INLINE_EDIT_OPTIONS');
