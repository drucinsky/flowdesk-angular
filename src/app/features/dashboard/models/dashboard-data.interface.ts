import type { IDashboardActivity } from './dashboard-activity.interface';
import type { IDashboardCase } from './dashboard-case.interface';
import type { IDashboardKpi } from './dashboard-kpi.interface';

export interface IDashboardData {
  readonly kpis: readonly IDashboardKpi[];
  readonly priorityCases: readonly IDashboardCase[];
  readonly recentActivities: readonly IDashboardActivity[];
}
