import { TestBed } from '@angular/core/testing';

import { CommentsHandlingService } from './comments-handling.service';

describe('CommentsHandlingService', () => {
  let service: CommentsHandlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentsHandlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
