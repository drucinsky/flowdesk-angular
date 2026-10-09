import type { ITableScrollConfig } from '../models/table-state-config.interface';

export const DEFAULT_TABLE_PAGE_SIZE_OPTIONS: readonly number[] = [10, 20, 50, 100];

export const DEFAULT_TABLE_SCROLL: ITableScrollConfig = {
  x: '1450px',
  y: '100%',
};

export const DEFAULT_TABLE_FILTERS_DEBOUNCE_MS = 300;
