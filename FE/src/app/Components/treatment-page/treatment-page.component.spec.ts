import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentPageComponent } from './treatment-page.component';

describe('TreatmentPageComponent', () => {
  let component: TreatmentPageComponent;
  let fixture: ComponentFixture<TreatmentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreatmentPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
