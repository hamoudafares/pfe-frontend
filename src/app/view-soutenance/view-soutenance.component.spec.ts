import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSoutenanceComponent } from './view-soutenance.component';

describe('ViewSoutenanceComponent', () => {
  let component: ViewSoutenanceComponent;
  let fixture: ComponentFixture<ViewSoutenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSoutenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSoutenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
