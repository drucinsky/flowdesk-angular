import { Service } from '@angular/core';
import type { NzModalRef } from 'ng-zorro-antd/modal';
import { take } from 'rxjs';

@Service()
export class ModalRegistryService {
  private readonly _refs = new Map<string, NzModalRef>();

  has(key: string): boolean {
    return this._refs.has(key);
  }

  register(key: string, ref: NzModalRef): void {
    this._refs.set(key, ref);

    ref.afterClose.pipe(take(1)).subscribe(() => {
      this._refs.delete(key);
    });
  }

  close(key: string): void {
    this._refs.get(key)?.close();
  }
}
