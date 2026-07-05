import { DestroyRef, Directive, Injector, effect, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs';
import { TABLE_STATE_CONFIG } from '../tokens/table-state.tokens';
import type { ITableStateConfig } from '../models/table-state-config.interface';

@Directive()
export abstract class BaseTableFiltersComponent<TFilters extends object, TForm extends FormGroup> {
  private readonly _config = inject(TABLE_STATE_CONFIG) as ITableStateConfig<unknown, TFilters, string>;
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _injector = inject(Injector);

  readonly filters = input.required<TFilters>();
  readonly filtersChange = output<TFilters>();

  protected readonly form: TForm;
  protected readonly valueChangesDebounceMs = 300;

  constructor() {
    this.form = this.createForm();

    this._syncInputFiltersWithForm();
    this._listenFormValueChanges();
  }

  protected abstract createForm(): TForm;

  protected getFormValue(): TFilters {
    return this.form.getRawValue() as TFilters;
  }

  protected resetFilters(): void {
    const defaultFilters = this._config.defaultFilters;

    this.form.patchValue(defaultFilters, {
      emitEvent: false,
    });

    this.filtersChange.emit(defaultFilters);
  }

  protected shouldEmitFilters(): boolean {
    return this.form.valid;
  }

  protected areFiltersEqual(previousFilters: TFilters, currentFilters: TFilters): boolean {
    return areShallowObjectsEqual(previousFilters, currentFilters);
  }

  private _syncInputFiltersWithForm(): void {
    effect(
      () => {
        this.form.patchValue(this.filters(), {
          emitEvent: false,
        });
      },
      {
        injector: this._injector,
      },
    );
  }

  private _listenFormValueChanges(): void {
    this.form.valueChanges
      .pipe(
        debounceTime(this.valueChangesDebounceMs),
        filter(() => this.shouldEmitFilters()),
        map(() => this.getFormValue()),
        distinctUntilChanged((previousFilters, currentFilters) => this.areFiltersEqual(previousFilters, currentFilters)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe((filters) => {
        this.filtersChange.emit(filters);
      });
  }
}

function areShallowObjectsEqual(firstObject: object, secondObject: object): boolean {
  const firstRecord = firstObject as Record<string, unknown>;
  const secondRecord = secondObject as Record<string, unknown>;

  const firstKeys = Object.keys(firstRecord);
  const secondKeys = Object.keys(secondRecord);

  if (firstKeys.length !== secondKeys.length) {
    return false;
  }

  return firstKeys.every((key) => areValuesEqual(firstRecord[key], secondRecord[key]));
}

function areValuesEqual(firstValue: unknown, secondValue: unknown): boolean {
  if (Array.isArray(firstValue) && Array.isArray(secondValue)) {
    return areArraysEqual(firstValue, secondValue);
  }

  if (firstValue instanceof Date && secondValue instanceof Date) {
    return firstValue.getTime() === secondValue.getTime();
  }

  return Object.is(firstValue, secondValue);
}

function areArraysEqual(firstArray: readonly unknown[], secondArray: readonly unknown[]): boolean {
  if (firstArray.length !== secondArray.length) {
    return false;
  }

  return firstArray.every((value, index) => Object.is(value, secondArray[index]));
}
