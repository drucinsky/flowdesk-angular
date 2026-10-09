import { Service } from '@angular/core';
import { generateDashboardData } from './dashboard.mock';
import { delay, type Observable, of } from 'rxjs';
import { type IDashboardData } from '../models/dashboard-data.interface';

@Service()
export class DashboardService {
  getDashboardData(): Observable<IDashboardData> {
    return of(generateDashboardData()).pipe(delay(500));
  }
}
