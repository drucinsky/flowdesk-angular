import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { CasesStatusTabsComponent } from './cases-status-tabs.component';

describe('CasesStatusTabsComponent', () => {
  let component: CasesStatusTabsComponent;
  let fixture: ComponentFixture<CasesStatusTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CasesStatusTabsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CasesStatusTabsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
