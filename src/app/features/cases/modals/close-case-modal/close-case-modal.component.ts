import { ChangeDetectionStrategy, Component, DestroyRef, effect, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CloseCaseModalFacade } from './close-case-modal.facade';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
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

  private readonly _message = inject(NzMessageService);
  private readonly _destroyRef = inject(DestroyRef);

  protected readonly data = inject<ICloseCaseModalData>(NZ_MODAL_DATA);
  protected readonly facade = inject(CloseCaseModalFacade);

  // nzOkLoading also makes NzModal ignore the Esc key and mask clicks while the request is pending.
  private readonly _lockModalWhileLoading = effect(() => {
    const isLoading = this.facade.loading();

    this._modalRef.updateConfig({
      nzOkLoading: isLoading,
      nzClosable: !isLoading,
    });
  });

  protected cancel(): void {
    this._modalRef.close();
  }

  protected confirm(): void {
    if (this.facade.form.invalid) {
      this.facade.form.markAllAsTouched();
      return;
    }

    this.facade
      .closeCase(this.data)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (result) => {
          this._modalRef.close(result);
        },
        error: () => {
          this._message.error('Could not close the case. Please try again.');
        },
      });
  }
}
