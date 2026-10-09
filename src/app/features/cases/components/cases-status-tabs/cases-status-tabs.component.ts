import { Component, model } from '@angular/core';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

import { CaseStatus } from '../../models/case-status.enum';

interface IStatusTab {
  readonly label: string;
  readonly value: CaseStatus | null;
  readonly count?: number;
  readonly danger?: boolean;
  readonly warning?: boolean;
}

@Component({
  selector: 'fd-cases-status-tabs',
  imports: [NzBadgeModule],
  templateUrl: './cases-status-tabs.component.html',
  styleUrl: './cases-status-tabs.component.scss',
})
export class CasesStatusTabsComponent {
  readonly selectedStatus = model<CaseStatus | null>(null);

  protected readonly tabs: readonly IStatusTab[] = [
    {
      label: 'All',
      value: null,
    },
    {
      label: 'In progress',
      value: CaseStatus.IN_PROGRESS,
    },
    {
      label: 'SLA risk',
      value: CaseStatus.SLA_RISK,
      count: 5,
      danger: true,
    },
    {
      label: 'Waiting',
      value: CaseStatus.WAITING,
      count: 9,
      warning: true,
    },
    {
      label: 'Closed',
      value: CaseStatus.CLOSED,
    },
  ];

  protected selectStatus(status: CaseStatus | null): void {
    this.selectedStatus.set(status);
  }
}
