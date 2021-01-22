import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitSoutenanceFormComponent } from './submit-soutenance-form.component';

describe('SubmitSoutenanceFormComponent', () => {
  let component: SubmitSoutenanceFormComponent;
  let fixture: ComponentFixture<SubmitSoutenanceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitSoutenanceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitSoutenanceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
