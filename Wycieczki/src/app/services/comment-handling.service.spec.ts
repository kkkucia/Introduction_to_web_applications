import { TestBed } from '@angular/core/testing';

import { CommentHandlingService } from './comment-handling.service';

describe('CommentHandlingService', () => {
  let service: CommentHandlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentHandlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
