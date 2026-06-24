import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';

import { DashboardActivityType } from '../../models/dashboard-activity-type.enum';
import type { IDashboardActivity } from '../../models/dashboard-activity.interface';

const ACTIVITY_COLORS: Record<DashboardActivityType, string> = {
  [DashboardActivityType.CASE]: 'blue',
  [DashboardActivityType.MESSAGE]: 'green',
  [DashboardActivityType.NOTE]: 'gold',
  [DashboardActivityType.SYSTEM]: 'gray',
};

@Component({
  selector: 'fd-recent-activity-widget',
  imports: [NzTimelineModule],
  templateUrl: './recent-activity-widget.component.html',
  styleUrl: './recent-activity-widget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentActivityWidgetComponent {
  readonly activities = input.required<readonly IDashboardActivity[]>();

  protected getActivityColor(type: DashboardActivityType): string {
    return ACTIVITY_COLORS[type];
  }
}
