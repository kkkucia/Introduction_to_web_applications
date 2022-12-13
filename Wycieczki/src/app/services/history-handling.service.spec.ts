import { TestBed } from '@angular/core/testing';

import { HistoryHandlingService } from './history-handling.service';

describe('HistoryHandlingService', () => {
  let service: HistoryHandlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryHandlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
