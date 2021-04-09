import { TestBed } from '@angular/core/testing';

import { CategoriaAvaliacaoDiametroOsseoService } from './categoria-avaliacao-diametro-osseo.service';

describe('CategoriaAvaliacaoDiametroOsseoService', () => {
  let service: CategoriaAvaliacaoDiametroOsseoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaAvaliacaoDiametroOsseoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
