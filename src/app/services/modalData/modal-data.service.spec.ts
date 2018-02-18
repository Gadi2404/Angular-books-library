import { TestBed, inject } from '@angular/core/testing';

import { ModalDataService } from './modal-data.service';

describe('ModalDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalDataService]
    });
  });

  it('should be created', inject([ModalDataService], (service: ModalDataService) => {
    expect(service).toBeTruthy();
  }));
});
