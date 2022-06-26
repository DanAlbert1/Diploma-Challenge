import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentFormDialogComponent } from './treatment-form-dialog.component';

describe('TreatmentFormDialogComponent', () => {
  let component: TreatmentFormDialogComponent;
  let fixture: ComponentFixture<TreatmentFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreatmentFormDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
