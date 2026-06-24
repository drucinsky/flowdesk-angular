import { type DashboardActivityType } from './dashboard-activity-type.enum';

export interface IDashboardActivity {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly author: string;
  readonly time: string;
  readonly type: DashboardActivityType;
}
