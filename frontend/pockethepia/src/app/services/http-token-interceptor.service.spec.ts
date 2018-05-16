import { TestBed, inject } from '@angular/core/testing';

import { HttpTokenInterceptorService } from './http-token-interceptor.service';

describe('HttpTokenInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpTokenInterceptorService]
    });
  });

  it('should be created', inject([HttpTokenInterceptorService], (service: HttpTokenInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
