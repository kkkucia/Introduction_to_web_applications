import { TestBed } from '@angular/core/testing';

import { FilterRangesService } from './filter-ranges.service';

describe('FilterRangesService', () => {
  let service: FilterRangesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterRangesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
