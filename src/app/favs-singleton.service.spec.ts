import { TestBed } from '@angular/core/testing';

import { FavsSingletonService } from './favs-singleton.service';

describe('FavsSingletonService', () => {
  let service: FavsSingletonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavsSingletonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
