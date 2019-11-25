import { TestBed } from '@angular/core/testing';

import { WeNoteService } from './we-note.service';

describe('WeNoteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeNoteService = TestBed.get(WeNoteService);
    expect(service).toBeTruthy();
  });
});
