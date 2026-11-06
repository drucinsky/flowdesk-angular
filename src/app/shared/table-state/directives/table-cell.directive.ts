import { Directive, TemplateRef, inject, input } from '@angular/core';

/**
 * Cell content of the column with the given key: `<ng-template fdTableCell="company" let-row>...</ng-template>`.
 * The template context carries the row as `$implicit`. Intentionally has no context guard, so the row is untyped in the template.
 */
@Directive({
  selector: 'ng-template[fdTableCell]',
})
export class TableCellDirective {
  readonly fdTableCell = input.required<string>();

  readonly template = inject(TemplateRef);
}

/**
 * Content of the row that is shown below an expanded row: `<ng-template fdTableExpandedRow let-row>...</ng-template>`.
 * Requires `withRowExpansion()`; the template is rendered only for expanded rows.
 */
@Directive({
  selector: 'ng-template[fdTableExpandedRow]',
})
export class TableExpandedRowDirective {
  readonly template = inject(TemplateRef);
}
