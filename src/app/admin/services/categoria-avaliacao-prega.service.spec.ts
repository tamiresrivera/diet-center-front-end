import { TestBed } from '@angular/core/testing';

import { CategoriaAvaliacaoPregaService } from './categoria-avaliacao-prega.service';

describe('CategoriaAvaliacaoPregaService', () => {
  let service: CategoriaAvaliacaoPregaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaAvaliacaoPregaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
