import { Directive, HostBinding, HostListener, computed, inject, input } from '@angular/core';

import { TableSortDirection } from '../models/table-sort.interface';
import { TableDataFacadeService } from '../services/table-data-facade.service';

@Directive({
  selector: 'th[fdTableSort]',
  standalone: true,
})
export class TableSortDirective<TFilters extends object, TSortKey extends string = string> {
  readonly fdTableSort = input.required<TSortKey>();

  private readonly _tableFacade = inject(TableDataFacadeService<unknown, TFilters, TSortKey>);

  private readonly _isActive = computed(() => this._tableFacade.sort()?.key === this.fdTableSort());
  private readonly _isAscending = computed(() => this._isActive() && this._tableFacade.sort()?.direction === TableSortDirection.ASC);
  private readonly _isDescending = computed(() => this._isActive() && this._tableFacade.sort()?.direction === TableSortDirection.DESC);

  @HostBinding('class.fd-sortable-th')
  protected readonly sortableClass = true;

  @HostBinding('class.fd-sort-asc')
  protected get isAscending(): boolean {
    return this._isAscending();
  }

  @HostBinding('class.fd-sort-desc')
  protected get isDescending(): boolean {
    return this._isDescending();
  }

  @HostBinding('attr.role')
  protected readonly role = 'button';

  @HostBinding('attr.tabindex')
  protected readonly tabIndex = '0';

  @HostListener('click')
  protected onClick(): void {
    this._toggleSort();
  }

  @HostListener('keydown.enter')
  @HostListener('keydown.space')
  protected onKeyboardSort(): void {
    this._toggleSort();
  }

  private _toggleSort(): void {
    const key = this.fdTableSort();
    const currentSort = this._tableFacade.sort();

    if (currentSort?.key !== key) {
      this._tableFacade.setSort({
        key,
        direction: TableSortDirection.ASC,
      });

      return;
    }

    if (currentSort.direction === TableSortDirection.ASC) {
      this._tableFacade.setSort({
        key,
        direction: TableSortDirection.DESC,
      });

      return;
    }

    this._tableFacade.setSort(null);
  }
}
