import { TestBed } from '@angular/core/testing';

import { FirestoreBookService } from './firestore-book-service';

describe('FirestoreBookService', () => {
  let service: FirestoreBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
