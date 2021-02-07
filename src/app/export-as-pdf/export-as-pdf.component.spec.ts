import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportAsPdfComponent } from './export-as-pdf.component';

describe('ExportAsPdfComponent', () => {
  let component: ExportAsPdfComponent;
  let fixture: ComponentFixture<ExportAsPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportAsPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportAsPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
