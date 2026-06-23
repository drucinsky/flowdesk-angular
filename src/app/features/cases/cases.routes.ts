import { type Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/cases-page/cases-page.component').then((c) => c.CasesPageComponent),
  },
];
