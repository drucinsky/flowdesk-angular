import { Injectable, computed, inject, linkedSignal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import type { ITableDataResult } from '../models/table-data-result.interface';
import type { ITableQuery } from '../models/table-query.interface';
import { injectTableConfig, injectTableDataSource } from '../table-state-config.feature';
import { TableFiltersStateService } from '../services/table-filters-state.service';
import { TablePaginationStateService } from '../services/table-pagination-state.service';
import { TableSortStateService } from '../services/table-sort-state.service';
import type { ITableSort } from '../models/table-sort.interface';
import { DEFAULT_TABLE_PAGE_SIZE_OPTIONS, DEFAULT_TABLE_SCROLL } from '../config/table-default.config';

@Injectable()
export class TableDataFacade<TRow, TFilters extends object, TSortKey extends string = string> {
  private readonly _config = injectTableConfig<TRow, TFilters, TSortKey>();
  private readonly _filtersState = inject(TableFiltersStateService<TFilters>);
  private readonly _paginationState = inject(TablePaginationStateService);
  private readonly _sortState = inject(TableSortStateService<TSortKey>);
  private readonly _dataSource = injectTableDataSource<TRow, TFilters, TSortKey>();

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

  // rxResource clears its value when params change, so keep the last result to avoid flashing an empty table.
  private readonly _lastResult = linkedSignal<ITableDataResult<TRow> | undefined, ITableDataResult<TRow> | undefined>({
    source: () => (this._resource.hasValue() ? this._resource.value() : undefined),
    computation: (value, previous) => value ?? previous?.value,
  });

  readonly items = computed<readonly TRow[]>(() => this._lastResult()?.items ?? []);
  readonly total = computed(() => this._lastResult()?.total ?? 0);
  readonly isLoading = this._resource.isLoading;
  readonly isInitialLoading = computed(() => this._resource.isLoading() && !this._lastResult());

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
