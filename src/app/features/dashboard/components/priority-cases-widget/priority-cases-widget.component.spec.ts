import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityCasesWidgetComponent } from './priority-cases-widget.component';

describe('PriorityCasesWidgetComponent', () => {
  let component: PriorityCasesWidgetComponent;
  let fixture: ComponentFixture<PriorityCasesWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriorityCasesWidgetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PriorityCasesWidgetComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
