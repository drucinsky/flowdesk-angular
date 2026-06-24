import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

import type { IDashboardKpi } from '../../models/dashboard-kpi.interface';
import { DashboardKpiType } from '../../models/dashboard-kpi-type.enum';

@Component({
  selector: 'fd-dashboard-kpi-card',
  imports: [NzIconModule],
  templateUrl: './dashboard-kpi-card.component.html',
  styleUrl: './dashboard-kpi-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardKpiCardComponent {
  readonly kpi = input.required<IDashboardKpi>();

  protected readonly cardClass = computed(() => {
    const type = this.kpi().type;

    return {
      'kpi-card-primary': type === DashboardKpiType.PRIMARY,
      'kpi-card-danger': type === DashboardKpiType.DANGER,
      'kpi-card-success': type === DashboardKpiType.SUCCESS,
      'kpi-card-warning': type === DashboardKpiType.WARNING,
    };
  });
}
