import { Component, inject, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';

import type { IExportScopeFormValue, IExportScopeModalData, IExportScopeModalResult } from './export-scope-modal.types';

@Component({
  selector: 'fd-export-scope-modal',
  imports: [FormField, NzButtonModule, NzRadioModule],
  templateUrl: './export-scope-modal.component.html',
  styleUrl: './export-scope-modal.component.scss',
})
export class ExportScopeModalComponent {
  private readonly _modalRef = inject<NzModalRef<unknown, IExportScopeModalResult>>(NzModalRef);

  protected readonly data = inject<IExportScopeModalData>(NZ_MODAL_DATA);

  private readonly _formValue = signal<IExportScopeFormValue>({
    scope: this.data.selectedCount > 0 ? 'selected' : 'page',
  });

  protected readonly form = form(this._formValue);

  protected cancel(): void {
    this._modalRef.close();
  }

  protected confirm(): void {
    this._modalRef.close({ scope: this._formValue().scope });
  }
}
