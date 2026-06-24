import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardKpiCardComponent } from './dashboard-kpi-card.component';

describe('DashboardKpiCardComponent', () => {
  let component: DashboardKpiCardComponent;
  let fixture: ComponentFixture<DashboardKpiCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardKpiCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardKpiCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
