import { TestBed } from '@angular/core/testing';

import { HajoService } from './hajo.service';

describe('HajoService', () => {
  let service: HajoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HajoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
