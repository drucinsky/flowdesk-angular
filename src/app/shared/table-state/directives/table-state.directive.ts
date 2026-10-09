import { ChangeDetectorRef, Directive, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzTableComponent } from 'ng-zorro-antd/table';

import { injectTableState } from '../table-state.feature';

@Directive({
  selector: 'nz-table[fdTableState]',
})
export class TableStateDirective<TRow, TFilters extends object, TSortKey extends string = string> {
  private readonly _table = inject(NzTableComponent) as NzTableComponent<TRow>;
  private readonly _tableFacade = injectTableState<TRow, TFilters, TSortKey>();
  private readonly _changeDetectorRef = inject(ChangeDetectorRef);

  constructor() {
    this._applyTableDefaults();
    this._listenPageIndexChanges();
    this._listenPageSizeChanges();
  }

  private _applyTableDefaults(): void {
    this._table.nzFrontPagination = false;
    this._table.nzShowSizeChanger = true;
    this._table.nzPageSizeOptions = this._tableFacade.pageSizeOptions();

    this._changeDetectorRef.markForCheck();
  }

  private _listenPageIndexChanges(): void {
    this._table.nzPageIndexChange.pipe(takeUntilDestroyed()).subscribe((pageIndex) => {
      this._tableFacade.setPageIndex(pageIndex);
    });
  }

  private _listenPageSizeChanges(): void {
    this._table.nzPageSizeChange.pipe(takeUntilDestroyed()).subscribe((pageSize) => {
      this._tableFacade.setPageSize(pageSize);
    });
  }
}
