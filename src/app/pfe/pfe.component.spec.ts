import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfeComponent } from './pfe.component';

describe('PfeComponent', () => {
  let component: PfeComponent;
  let fixture: ComponentFixture<PfeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PfeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
