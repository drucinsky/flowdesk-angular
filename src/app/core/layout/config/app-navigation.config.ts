import type { INavigationItem } from '../models/navigation-item.interface';

export const APP_NAVIGATION_ITEMS: readonly INavigationItem[] = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: 'home',
    exact: true,
  },
  {
    label: 'Tasks',
    path: '/tasks',
    icon: 'check-square',
  },
  {
    label: 'Cases',
    path: '/cases',
    icon: 'folder-open',
  },
  {
    label: 'Customers',
    path: '/customers',
    icon: 'team',
  },
  {
    label: 'Messages',
    path: '/messages',
    icon: 'message',
  },
  {
    label: 'Reports',
    path: '/reports',
    icon: 'bar-chart',
  },
  {
    label: 'Settings',
    path: '/settings',
    icon: 'setting',
  },
];
