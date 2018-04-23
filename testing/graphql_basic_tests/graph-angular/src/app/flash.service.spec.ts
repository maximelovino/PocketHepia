import { TestBed, inject } from '@angular/core/testing';

import { FlashService } from './flash.service';

describe('FlashService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlashService]
    });
  });

  it('should be created', inject([FlashService], (service: FlashService) => {
    expect(service).toBeTruthy();
  }));
});
