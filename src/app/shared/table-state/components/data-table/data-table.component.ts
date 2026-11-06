import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, contentChild, contentChildren, inject, input } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

import { TableCellDirective, TableExpandedRowDirective } from '../../directives/table-cell.directive';
import { TableSortDirective } from '../../directives/table-sort.directive';
import { TableStateDirective } from '../../directives/table-state.directive';
import { TableRowExpansionState } from '../../features/row-expansion/table-row-expansion-state.service';
import { TableSelectionState } from '../../features/selection/table-selection-state.service';
import type { ITableColumn } from '../../models/table-column.interface';
import { injectTableState } from '../../table-state.feature';

/**
 * Server-side table bound to the state provided by `provideTableState()`: pagination, sorting, loading,
 * and (when the matching features are provided) the selection and row expansion columns.
 * Columns are described by `columns`; cells are projected with `fdTableCell` templates.
 * Content other than templates (e.g. `fd-table-selection-bar`) is placed inside the card.
 */
@Component({
  selector: 'fd-data-table',
  imports: [NgTemplateOutlet, NzButtonModule, NzIconModule, NzTableModule, NzTooltipModule, TableSortDirective, TableStateDirective],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
})
export class DataTableComponent<TRow, TSortKey extends string = string> {
  readonly columns = input.required<readonly ITableColumn<TSortKey>[]>();
  readonly rowKey = input.required<(row: TRow) => string>();
  /** Human readable name of the row, used in accessible labels (e.g. the company of a customer). */
  readonly rowLabel = input.required<(row: TRow) => string>();
  /** Plural name of the rows, used in accessible labels (e.g. `customers`). */
  readonly entity = input('rows');

  protected readonly table = injectTableState<TRow, object, TSortKey>();
  protected readonly selection = inject(TableSelectionState, { optional: true }) as TableSelectionState<TRow> | null;
  protected readonly expansion = inject(TableRowExpansionState, { optional: true }) as TableRowExpansionState<TRow> | null;

  protected readonly expandedRow = contentChild(TableExpandedRowDirective);
  private readonly _cells = contentChildren(TableCellDirective);

  protected readonly cellTemplates = computed(() => new Map(this._cells().map((cell) => [cell.fdTableCell(), cell.template])));

  protected detailsId(row: TRow): string {
    return `fd-table-details-${this.rowKey()(row)}`;
  }
}
