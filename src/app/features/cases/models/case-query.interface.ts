import type { ICaseFilters } from './case-filters.interface';

export interface ICasesQuery {
  readonly filters: ICaseFilters;
  readonly pageIndex: number;
  readonly pageSize: number;
}
