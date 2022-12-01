import { TestBed } from '@angular/core/testing';

import { HandleTravelsService } from './handle-travels.service';

describe('HandleTravelsService', () => {
  let service: HandleTravelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleTravelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
