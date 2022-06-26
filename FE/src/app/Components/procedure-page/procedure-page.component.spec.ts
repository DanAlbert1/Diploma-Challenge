import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedurePageComponent } from './procedure-page.component';

describe('ProcedurePageComponent', () => {
  let component: ProcedurePageComponent;
  let fixture: ComponentFixture<ProcedurePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcedurePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedurePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
