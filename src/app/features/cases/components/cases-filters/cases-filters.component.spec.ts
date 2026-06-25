import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { CasesFiltersComponent } from './cases-filters.component';

describe('CasesFiltersComponent', () => {
  let component: CasesFiltersComponent;
  let fixture: ComponentFixture<CasesFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CasesFiltersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CasesFiltersComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
