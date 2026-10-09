import type { Provider } from '@angular/core';

import type { ITableStateConfig } from '../models/table-state-config.interface';
import { TableDataFacade } from '../facades/table-data.facade';
import { TableFiltersStateService } from '../services/table-filters-state.service';
import { TablePaginationStateService } from '../services/table-pagination-state.service';
import { TableSortStateService } from '../services/table-sort-state.service';
import { TableStorageService } from '../services/table-storage.service';
import { TABLE_DATA_SOURCE, TABLE_STATE_CONFIG } from '../tokens/table-state.tokens';

export function provideTableState<TRow, TFilters extends object, TSortKey extends string = string>(
  config: ITableStateConfig<TRow, TFilters, TSortKey>,
): Provider[] {
  return [
    {
      provide: TABLE_STATE_CONFIG,
      useValue: config,
    },
    {
      provide: TABLE_DATA_SOURCE,
      useClass: config.dataSource,
    },
    TableStorageService,
    TableFiltersStateService,
    TablePaginationStateService,
    TableSortStateService,
    TableDataFacade,
  ];
}
