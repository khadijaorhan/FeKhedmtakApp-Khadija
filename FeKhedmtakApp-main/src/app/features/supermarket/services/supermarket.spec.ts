import { TestBed } from '@angular/core/testing';
import { Supermarket } from './supermarket';

describe('Supermarket', () => {
  let service: Supermarket;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Supermarket);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
