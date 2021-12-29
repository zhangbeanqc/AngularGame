import { TestBed } from '@angular/core/testing';

import { AnotherProductService } from './another-product.service';

describe('AnotherProductService', () => {
  let service: AnotherProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnotherProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
