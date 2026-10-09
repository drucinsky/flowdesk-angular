import { Directive, computed, inject, input } from '@angular/core';

import { TableSortDirection } from '../models/table-sort.interface';
import { TableDataFacadeService } from '../services/table-data-facade.service';

@Directive({
  selector: 'th[fdTableSort]',
  host: {
    class: 'fd-sortable-th',
    role: 'button',
    tabindex: '0',
    '[class.fd-sort-asc]': 'isAscending()',
    '[class.fd-sort-desc]': 'isDescending()',
    '(click)': 'toggleSort()',
    '(keydown.enter)': 'toggleSort()',
    '(keydown.space)': 'onSpace($event)',
  },
})
export class TableSortDirective<TFilters extends object, TSortKey extends string = string> {
  readonly fdTableSort = input.required<TSortKey>();

  private readonly _tableFacade = inject(TableDataFacadeService<unknown, TFilters, TSortKey>);

  private readonly _isActive = computed(() => this._tableFacade.sort()?.key === this.fdTableSort());
  protected readonly isAscending = computed(() => this._isActive() && this._tableFacade.sort()?.direction === TableSortDirection.ASC);
  protected readonly isDescending = computed(() => this._isActive() && this._tableFacade.sort()?.direction === TableSortDirection.DESC);

  protected onSpace(event: Event): void {
    event.preventDefault();
    this.toggleSort();
  }

  protected toggleSort(): void {
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
