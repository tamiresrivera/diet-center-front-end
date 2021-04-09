import { TestBed } from '@angular/core/testing';

import { CategoriaPlanoAlimentarService } from './categoria-plano-alimentar.service';

describe('CategoriaPlanoAlimentarService', () => {
  let service: CategoriaPlanoAlimentarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaPlanoAlimentarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
