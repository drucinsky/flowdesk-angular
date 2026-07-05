import { InjectionToken } from '@angular/core';

import type { ITableStateConfig } from '../models/table-state-config.interface';
import type { TableDataSource } from '../services/table-data-source.service';

export const TABLE_STATE_CONFIG = new InjectionToken<ITableStateConfig<unknown, object, string>>('TABLE_STATE_CONFIG');

export const TABLE_DATA_SOURCE = new InjectionToken<TableDataSource<unknown, object, string>>('TABLE_DATA_SOURCE');
