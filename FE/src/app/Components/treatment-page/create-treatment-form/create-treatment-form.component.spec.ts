import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTreatmentFormComponent } from './create-treatment-form.component';

describe('CreateTreatmentFormComponent', () => {
  let component: CreateTreatmentFormComponent;
  let fixture: ComponentFixture<CreateTreatmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTreatmentFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTreatmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
