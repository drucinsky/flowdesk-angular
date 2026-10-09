import { DestroyRef, type Signal, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzMessageService } from 'ng-zorro-antd/message';
import { type Observable, concat, concatMap, filter, finalize, map, of, range, switchMap, toArray } from 'rxjs';

import { buildCsv, type ICsvColumn } from '../../../csv/csv.util';
import { FileDownloadService } from '../../../files/file-download.service';
import { AppModalService } from '../../../modal/app-modal.service';
import type { ITableQuery } from '../../models/table-query.interface';
import { injectTableDataSource } from '../../table-state-config.feature';
import { injectTableState } from '../../table-state.feature';
import { TableSelectionState } from '../selection/table-selection-state.service';
import { EXPORT_SCOPE_MODAL } from './export-scope-modal/export-scope-modal.definition';
import type { TableExportScope } from './export-scope-modal/export-scope-modal.types';

const EXPORT_PAGE_SIZE = 100;
const DEFAULT_MAX_ROWS = 5000;
const CSV_MIME_TYPE = 'text/csv;charset=utf-8';

const FILE_NAME_SUFFIX: Record<TableExportScope, string> = {
  page: '-page',
  all: '',
  selected: '-selected',
};

export interface ITableExportOptions<TRow> {
  /** File name without the extension and date, e.g. `customers`. */
  readonly fileName: string;
  readonly columns: readonly ICsvColumn<TRow>[];
  readonly delimiter?: ';' | ',';
  /** Maximum number of rows exported with the "all matching filters" scope. Defaults to 5000. */
  readonly maxRows?: number;
}

export interface ITableExport {
  readonly isExporting: Signal<boolean>;
  exportCsv(): void;
}

interface ICollectedRows<TRow> {
  readonly rows: readonly TRow[];
  readonly isTruncated: boolean;
}

/**
 * CSV export of a table: asks which rows to export (current page, all rows matching the filters or the selected rows),
 * collects them and downloads the file. The "all" scope loads pages through the table data source.
 */
export function injectTableExport<TRow, TFilters extends object, TSortKey extends string = string>(
  options: ITableExportOptions<TRow>,
): ITableExport {
  const table = injectTableState<TRow, TFilters, TSortKey>();
  const dataSource = injectTableDataSource<TRow, TFilters, TSortKey>();
  const selection = inject(TableSelectionState, { optional: true }) as TableSelectionState<TRow> | null;
  const modal = inject(AppModalService);
  const fileDownload = inject(FileDownloadService);
  const message = inject(NzMessageService);
  const destroyRef = inject(DestroyRef);

  const maxRows = options.maxRows ?? DEFAULT_MAX_ROWS;
  const isExporting = signal(false);

  function fetchAllRows(query: ITableQuery<TFilters, TSortKey>): Observable<ICollectedRows<TRow>> {
    const getPage = (pageIndex: number) => dataSource.getList({ ...query, pageIndex, pageSize: EXPORT_PAGE_SIZE });

    return getPage(1).pipe(
      switchMap((firstPage) => {
        const pageCount = Math.ceil(Math.min(firstPage.total, maxRows) / EXPORT_PAGE_SIZE);
        const nextPages$ = range(2, Math.max(pageCount - 1, 0)).pipe(concatMap(getPage));

        return concat(of(firstPage), nextPages$).pipe(
          toArray(),
          map((pages) => ({
            rows: pages.flatMap((page) => page.items).slice(0, maxRows),
            isTruncated: firstPage.total > maxRows,
          })),
        );
      }),
    );
  }

  function collectRows(scope: TableExportScope): Observable<ICollectedRows<TRow>> {
    switch (scope) {
      case 'page':
        return of({ rows: table.items(), isTruncated: false });
      case 'selected':
        return of({ rows: selection?.selectedRows() ?? [], isTruncated: false });
      case 'all':
        return fetchAllRows(table.query());
    }
  }

  function getFileName(scope: TableExportScope): string {
    const date = new Date().toISOString().slice(0, 10);

    return `${options.fileName}-${date}${FILE_NAME_SUFFIX[scope]}.csv`;
  }

  function exportCsv(): void {
    if (isExporting()) {
      return;
    }

    modal
      .open(EXPORT_SCOPE_MODAL, {
        pageCount: table.items().length,
        totalCount: table.total(),
        selectedCount: selection?.count() ?? 0,
        maxRows,
      })
      .pipe(
        filter((result) => result !== undefined),
        switchMap((result) => {
          isExporting.set(true);

          return collectRows(result.scope).pipe(
            map(({ rows, isTruncated }) => {
              const content = buildCsv(options.columns, rows, { delimiter: options.delimiter });

              fileDownload.download(content, getFileName(result.scope), CSV_MIME_TYPE);

              return { count: rows.length, isTruncated };
            }),
            finalize(() => {
              isExporting.set(false);
            }),
          );
        }),
        takeUntilDestroyed(destroyRef),
      )
      .subscribe({
        next: ({ count, isTruncated }) => {
          if (isTruncated) {
            message.warning(`Exported the first ${count} rows. The export is limited to ${maxRows} rows.`);
          } else {
            message.success(`Exported ${count} rows.`);
          }
        },
        error: () => {
          message.error('Could not export the data. Please try again.');
        },
      });
  }

  return {
    isExporting: isExporting.asReadonly(),
    exportCsv,
  };
}
