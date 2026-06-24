import { type Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard.routes').then((r) => r.routes),
      },
      {
        path: 'cases',
        loadChildren: () => import('./features/cases/cases.routes').then((r) => r.routes),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
