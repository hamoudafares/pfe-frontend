import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoutenanceCalenderComponent } from './soutenance-calender.component';

describe('SoutenanceCalenderComponent', () => {
  let component: SoutenanceCalenderComponent;
  let fixture: ComponentFixture<SoutenanceCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoutenanceCalenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoutenanceCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
