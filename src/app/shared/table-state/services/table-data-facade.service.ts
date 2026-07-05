import { Injectable, computed, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import type { ITableQuery } from '../models/table-query.interface';
import { TABLE_DATA_SOURCE, TABLE_STATE_CONFIG } from '../tokens/table-state.tokens';
import { TableFiltersStateService } from './table-filters-state.service';
import { TablePaginationStateService } from './table-pagination-state.service';
import { TableSortStateService } from './table-sort-state.service';
import type { TableDataSource } from './table-data-source.service';
import type { ITableSort } from '../models/table-sort.interface';
import type { ITableStateConfig } from '../models/table-state-config.interface';
import { DEFAULT_TABLE_PAGE_SIZE_OPTIONS, DEFAULT_TABLE_SCROLL } from '../config/table-default.config';

@Injectable()
export class TableDataFacadeService<TRow, TFilters extends object, TSortKey extends string = string> {
  private readonly _config = inject(TABLE_STATE_CONFIG) as ITableStateConfig<TRow, TFilters, TSortKey>;
  private readonly _filtersState = inject(TableFiltersStateService<TFilters>);
  private readonly _paginationState = inject(TablePaginationStateService);
  private readonly _sortState = inject(TableSortStateService<TSortKey>);
  private readonly _dataSource = inject(TABLE_DATA_SOURCE) as TableDataSource<TRow, TFilters, TSortKey>;

  readonly filters = this._filtersState.filters.asReadonly();
  readonly pageIndex = this._paginationState.pageIndex.asReadonly();
  readonly pageSize = this._paginationState.pageSize.asReadonly();
  readonly sort = this._sortState.sort.asReadonly();

  readonly pageSizeOptions = computed<number[]>(() => [...(this._config.pageSizeOptions ?? DEFAULT_TABLE_PAGE_SIZE_OPTIONS)]);
  readonly scroll = computed(() => this._config.scroll ?? DEFAULT_TABLE_SCROLL);

  readonly query = computed<ITableQuery<TFilters, TSortKey>>(() => ({
    filters: this.filters(),
    pageIndex: this.pageIndex(),
    pageSize: this.pageSize(),
    sort: this.sort(),
  }));

  private readonly _resource = rxResource({
    params: () => this.query(),
    stream: ({ params }) => this._dataSource.getList(params),
  });

  readonly items = computed<readonly TRow[]>(() => this._resource.value()?.items ?? []);
  readonly total = computed(() => this._resource.value()?.total ?? 0);
  readonly isLoading = this._resource.isLoading;
  readonly isInitialLoading = computed(() => this._resource.isLoading() && !this._resource.value());

  updateFilters(filters: Partial<TFilters>): void {
    this._filtersState.updateFilters(filters);
    this._paginationState.resetPageIndex();
  }

  resetFilters(): void {
    this._filtersState.resetFilters();
    this._paginationState.resetPageIndex();
  }

  setPageIndex(pageIndex: number): void {
    this._paginationState.setPageIndex(pageIndex);
  }

  setPageSize(pageSize: number): void {
    this._paginationState.setPageSize(pageSize);
  }

  setSort(sort: ITableSort<TSortKey> | null): void {
    this._sortState.setSort(sort);
    this._paginationState.resetPageIndex();
  }

  refresh(): void {
    this._resource.reload();
  }
}
