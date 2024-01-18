import { TestBed } from '@angular/core/testing';

import { ProductSpecService } from './product-spec.service';

describe('ProductSpecService', () => {
  let service: ProductSpecService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductSpecService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
