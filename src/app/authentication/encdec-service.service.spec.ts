import { TestBed } from '@angular/core/testing';

import { EncdecServiceService } from './encdec-service.service';

describe('EncdecServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EncdecServiceService = TestBed.get(EncdecServiceService);
    expect(service).toBeTruthy();
  });
});
