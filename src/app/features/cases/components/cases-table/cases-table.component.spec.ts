import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { CasesTableComponent } from './cases-table.component';

describe('CasesTableComponent', () => {
  let component: CasesTableComponent;
  let fixture: ComponentFixture<CasesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CasesTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CasesTableComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
