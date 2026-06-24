import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DashboardService } from '../../data-access/dashboard.service';
import { DashboardKpiCardComponent } from '../../components/dashboard-kpi-card/dashboard-kpi-card.component';
import { PriorityCasesWidgetComponent } from '../../components/priority-cases-widget/priority-cases-widget.component';
import { RecentActivityWidgetComponent } from '../../components/recent-activity-widget/recent-activity-widget.component';
import { rxResource } from '@angular/core/rxjs-interop';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'fd-dashboard-page',
  imports: [
    NzButtonModule,
    NzIconModule,
    NzSpinModule,
    DashboardKpiCardComponent,
    PriorityCasesWidgetComponent,
    RecentActivityWidgetComponent,
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent {
  private readonly _dashboardService = inject(DashboardService);

  protected readonly dashboardResource = rxResource({
    stream: () => this._dashboardService.getDashboardData(),
  });

  protected readonly dashboardData = computed(() => this.dashboardResource.value());

  protected refreshDashboard(): void {
    this.dashboardResource.reload();
  }
}
