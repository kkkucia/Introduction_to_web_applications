import { TestBed } from '@angular/core/testing';

import { BusketHandlingService } from './busket-handling.service';

describe('BusketHandlingService', () => {
  let service: BusketHandlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusketHandlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
