import { TestBed } from '@angular/core/testing';

import { PassworderService } from './passworder.service';

describe('PassworderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PassworderService = TestBed.get(PassworderService);
    expect(service).toBeTruthy();
  });
});
