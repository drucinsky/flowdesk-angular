import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { CasesPageComponent } from './cases-page.component';

describe('CasesPageComponent', () => {
  let component: CasesPageComponent;
  let fixture: ComponentFixture<CasesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CasesPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CasesPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
