import { TestBed } from '@angular/core/testing';

import { HexoService } from './hexo.service';

describe('HexoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HexoService = TestBed.get(HexoService);
    expect(service).toBeTruthy();
  });
});
