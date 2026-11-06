import { DestroyRef, type Signal, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzMessageService } from 'ng-zorro-antd/message';
import { type Observable, filter, finalize, switchMap } from 'rxjs';

import { ConfirmDialogService } from '../../modal/confirm-dialog.service';
import { TableSelectionState } from '../features/selection/table-selection-state.service';
import { injectTableState } from '../table-state.feature';

export interface ITableBulkDeleteResult {
  readonly deletedIds: readonly string[];
  readonly failed: readonly { readonly reason: string }[];
}

export interface ITableBulkDeleteOptions<TRow> {
  readonly rowId: (row: TRow) => string;
  /** Deletes the rows on the server. Rows that could not be deleted are reported in `failed`. */
  readonly delete: (rows: readonly TRow[]) => Observable<ITableBulkDeleteResult>;
  readonly entity: { readonly singular: string; readonly plural: string };
  readonly confirmTitle: string;
  /** Blocks deleting while another action (e.g. saving a row) is in progress. */
  readonly isBlocked?: () => boolean;
}

export interface ITableBulkDelete {
  readonly isDeleting: Signal<boolean>;
  deleteSelected(): void;
}

/**
 * Bulk delete of the selected rows: confirmation, request, deselecting the deleted rows,
 * refreshing the table and a summary message. Requires `withSelection()`.
 */
export function injectTableBulkDelete<TRow>(options: ITableBulkDeleteOptions<TRow>): ITableBulkDelete {
  const table = injectTableState<TRow, object>();
  const selection = inject(TableSelectionState) as TableSelectionState<TRow>;
  const confirmDialog = inject(ConfirmDialogService);
  const message = inject(NzMessageService);
  const destroyRef = inject(DestroyRef);

  const isDeleting = signal(false);

  function noun(count: number): string {
    return count === 1 ? options.entity.singular : options.entity.plural;
  }

  function handleResult(requestedCount: number, result: ITableBulkDeleteResult): void {
    const deletedIds = new Set(result.deletedIds);

    // Rows that could not be deleted stay selected, so the user can see them and retry.
    selection.deselect(selection.selectedRows().filter((row) => deletedIds.has(options.rowId(row))));

    if (deletedIds.size > 0) {
      table.refresh();
    }

    if (result.failed.length === 0) {
      message.success(`Deleted ${deletedIds.size} ${noun(deletedIds.size)}.`);
    } else if (deletedIds.size === 0) {
      message.error(`No ${options.entity.plural} were deleted. ${result.failed[0].reason}`);
    } else {
      message.warning(
        `Deleted ${deletedIds.size} of ${requestedCount} ${options.entity.plural}. ${result.failed.length} could not be deleted: ${result.failed[0].reason}`,
      );
    }
  }

  function deleteSelected(): void {
    const rows = selection.selectedRows();

    if (rows.length === 0 || isDeleting() || options.isBlocked?.()) {
      return;
    }

    confirmDialog
      .confirm({
        title: options.confirmTitle,
        message: `Delete ${rows.length} ${noun(rows.length)}? This action cannot be undone.`,
        confirmLabel: 'Delete',
        danger: true,
      })
      .pipe(
        filter((confirmed) => confirmed),
        switchMap(() => {
          isDeleting.set(true);

          return options.delete(rows).pipe(
            finalize(() => {
              isDeleting.set(false);
            }),
          );
        }),
        takeUntilDestroyed(destroyRef),
      )
      .subscribe({
        next: (result) => {
          handleResult(rows.length, result);
        },
        error: () => {
          message.error(`Could not delete the ${options.entity.plural}. Please try again.`);
        },
      });
  }

  return {
    isDeleting: isDeleting.asReadonly(),
    deleteSelected,
  };
}
