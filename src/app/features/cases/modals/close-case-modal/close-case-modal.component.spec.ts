import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseCaseModalComponent } from './close-case-modal.component';

describe('CloseCaseModalComponent', () => {
  let component: CloseCaseModalComponent;
  let fixture: ComponentFixture<CloseCaseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloseCaseModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CloseCaseModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
