import { TestBed } from '@angular/core/testing';

import { Distributions } from './distributions';

describe('Distributions', () => {
  let service: Distributions;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Distributions);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
