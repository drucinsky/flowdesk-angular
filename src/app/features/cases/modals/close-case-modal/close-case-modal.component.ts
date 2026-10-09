import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CloseCaseModalFacade } from './close-case-modal.facade';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import type { ICloseCaseModalData, ICloseCaseModalResult } from './close-case-modal.types';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'fd-close-case-modal',
  imports: [ReactiveFormsModule, NzButtonModule, NzInputModule],
  templateUrl: './close-case-modal.component.html',
  styleUrl: './close-case-modal.component.scss',
  providers: [CloseCaseModalFacade],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloseCaseModalComponent {
  private readonly _modalRef = inject<NzModalRef<unknown, ICloseCaseModalResult>>(NzModalRef);

  protected readonly data = inject<ICloseCaseModalData>(NZ_MODAL_DATA);
  protected readonly facade = inject(CloseCaseModalFacade);

  protected cancel(): void {
    this._modalRef.close();
  }

  protected confirm(): void {
    if (this.facade.form.invalid) {
      this.facade.form.markAllAsTouched();
      return;
    }

    this.facade.closeCase(this.data).subscribe((result) => {
      this._modalRef.close(result);
    });
  }
}
