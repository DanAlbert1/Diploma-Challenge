import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPetPopupFormComponent } from './add-pet-popup-form.component';

describe('AddPetPopupFormComponent', () => {
  let component: AddPetPopupFormComponent;
  let fixture: ComponentFixture<AddPetPopupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPetPopupFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPetPopupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
