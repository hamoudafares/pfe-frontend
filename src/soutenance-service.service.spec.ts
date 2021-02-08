import { TestBed } from '@angular/core/testing';

import { SoutenanceService } from './soutenance.service';

describe('SoutenanceService', () => {
  let service: SoutenanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoutenanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
