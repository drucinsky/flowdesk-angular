import { Component, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzRadioModule } from 'ng-zorro-antd/radio';

import { injectModal } from '../../../../modal/composables/modal.composable';
import type { IExportScopeFormValue, IExportScopeModalData, IExportScopeModalResult } from './export-scope-modal.types';

@Component({
  selector: 'fd-export-scope-modal',
  imports: [FormField, NzButtonModule, NzRadioModule],
  templateUrl: './export-scope-modal.component.html',
  styleUrl: './export-scope-modal.component.scss',
})
export class ExportScopeModalComponent {
  private readonly _modal = injectModal<IExportScopeModalData, IExportScopeModalResult>();

  protected readonly data = this._modal.data;

  private readonly _formValue = signal<IExportScopeFormValue>({
    scope: this.data.selectedCount > 0 ? 'selected' : 'page',
  });

  protected readonly form = form(this._formValue);

  protected cancel(): void {
    this._modal.close();
  }

  protected confirm(): void {
    this._modal.close({ scope: this._formValue().scope });
  }
}
