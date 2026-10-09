import { Service, inject } from '@angular/core';
import { ModalRegistryService } from './modal-registry.service';

@Service()
export class ModalConflictService {
  private readonly _registry = inject(ModalRegistryService);

  getBlockingKey(key: string, dependencies: readonly string[] = []): string | null {
    if (this._registry.has(key)) {
      return key;
    }

    return dependencies.find((dependency) => this._registry.has(dependency)) ?? null;
  }
}
