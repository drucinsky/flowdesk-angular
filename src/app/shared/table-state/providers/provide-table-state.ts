import { type Provider, isDevMode } from '@angular/core';

import type { ITableFeature } from '../models/table-feature.interface';
import type { ITableStateConfig } from '../models/table-state-config.interface';
import { TableDataFacade } from '../facades/table-data.facade';
import { TableFiltersStateService } from '../services/table-filters-state.service';
import { TablePaginationStateService } from '../services/table-pagination-state.service';
import { TableSortStateService } from '../services/table-sort-state.service';
import { TableStorageService } from '../services/table-storage.service';
import { TABLE_DATA_SOURCE, TABLE_STATE_CONFIG } from '../tokens/table-state.tokens';

export function provideTableState<TRow, TFilters extends object, TSortKey extends string = string>(
  config: ITableStateConfig<TRow, TFilters, TSortKey>,
  ...features: readonly ITableFeature[]
): Provider[] {
  assertUniqueFeatures(features);

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
    ...features.flatMap((feature) => feature.providers),
  ];
}

function assertUniqueFeatures(features: readonly ITableFeature[]): void {
  if (!isDevMode()) {
    return;
  }

  const names = new Set<string>();

  for (const feature of features) {
    if (names.has(feature.name)) {
      throw new Error(`Table feature "${feature.name}" is provided more than once.`);
    }

    names.add(feature.name);
  }
}
