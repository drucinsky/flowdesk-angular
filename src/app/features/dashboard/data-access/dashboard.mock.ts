import { DashboardActivityType } from '../models/dashboard-activity-type.enum';
import type { IDashboardActivity } from '../models/dashboard-activity.interface';
import { DashboardCasePriority } from '../models/dashboard-case-priority.enum';
import { DashboardCaseStatus } from '../models/dashboard-case-status.enum';
import type { IDashboardCase } from '../models/dashboard-case.interface';
import type { IDashboardData } from '../models/dashboard-data.interface';
import { DashboardKpiType } from '../models/dashboard-kpi-type.enum';
import type { IDashboardKpi } from '../models/dashboard-kpi.interface';

const CUSTOMERS = [
  'Acme Corporation',
  'Globex Inc.',
  'Soylent Corp.',
  'Umbrella Corp.',
  'Stark Industries',
];

const ASSIGNEES = ['Sarah Lee', 'Michael Chen', 'Emily Nguyen', 'David Kim'];

const CASE_TITLES = [
  'Unable to access analytics dashboard',
  'Billing details mismatch',
  'Security permissions issue',
  'Customer portal login problem',
  'Integration synchronization failed',
];

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomItem<T>(items: readonly T[]): T {
  return items[getRandomInt(0, items.length - 1)];
}

function generateKpis(): readonly IDashboardKpi[] {
  const openCases = getRandomInt(280, 360);
  const slaRisk = getRandomInt(12, 35);
  const newToday = getRandomInt(18, 42);
  const resolved = getRandomInt(55, 95);

  return [
    {
      label: 'Open cases',
      value: openCases,
      trend: getRandomInt(4, 16),
      description: 'Compared to yesterday',
      icon: 'folder-open',
      type: DashboardKpiType.PRIMARY,
    },
    {
      label: 'SLA risk',
      value: slaRisk,
      trend: getRandomInt(2, 12),
      description: 'Requires attention',
      icon: 'warning',
      type: DashboardKpiType.DANGER,
    },
    {
      label: 'New today',
      value: newToday,
      trend: getRandomInt(5, 20),
      description: 'Created today',
      icon: 'plus-circle',
      type: DashboardKpiType.SUCCESS,
    },
    {
      label: 'Resolved',
      value: resolved,
      trend: getRandomInt(3, 15),
      description: 'Closed today',
      icon: 'check-circle',
      type: DashboardKpiType.WARNING,
    },
  ];
}

function generatePriorityCases(): readonly IDashboardCase[] {
  return Array.from({ length: 4 }, (_, index) => {
    const priority = getRandomItem([
      DashboardCasePriority.MEDIUM,
      DashboardCasePriority.HIGH,
      DashboardCasePriority.CRITICAL,
    ]);

    const status =
      priority === DashboardCasePriority.CRITICAL
        ? DashboardCaseStatus.SLA_RISK
        : getRandomItem([
            DashboardCaseStatus.IN_PROGRESS,
            DashboardCaseStatus.WAITING,
            DashboardCaseStatus.NEW,
          ]);

    return {
      id: `#${12401 - index}`,
      customer: getRandomItem(CUSTOMERS),
      title: getRandomItem(CASE_TITLES),
      priority,
      status,
      sla: `${getRandomInt(0, 5)}h ${getRandomInt(5, 55)}m`,
      assignee: getRandomItem(ASSIGNEES),
    };
  });
}

function generateRecentActivities(): readonly IDashboardActivity[] {
  return [
    {
      id: crypto.randomUUID(),
      title: 'Case updated',
      description: 'Status changed to In Progress',
      author: getRandomItem(ASSIGNEES),
      time: '10:24 AM',
      type: DashboardActivityType.CASE,
    },
    {
      id: crypto.randomUUID(),
      title: 'Internal note added',
      description: 'Investigating customer permissions',
      author: getRandomItem(ASSIGNEES),
      time: '9:02 AM',
      type: DashboardActivityType.NOTE,
    },
    {
      id: crypto.randomUUID(),
      title: 'Customer replied',
      description: 'Provided additional screenshots',
      author: getRandomItem(CUSTOMERS),
      time: '8:45 AM',
      type: DashboardActivityType.MESSAGE,
    },
  ];
}

export function generateDashboardData(): IDashboardData {
  return {
    kpis: generateKpis(),
    priorityCases: generatePriorityCases(),
    recentActivities: generateRecentActivities(),
  };
}
