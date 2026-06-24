import { type DashboardKpiType } from './dashboard-kpi-type.enum';

export interface IDashboardKpi {
  readonly label: string;
  readonly value: number;
  readonly trend: number;
  readonly description: string;
  readonly icon: string;
  readonly type: DashboardKpiType;
}
