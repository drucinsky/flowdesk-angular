import type { ICase } from './case.interface';

export interface ICasesData {
  readonly cases: readonly ICase[];
  readonly total: number;
}
