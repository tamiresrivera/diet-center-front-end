import { TestBed } from '@angular/core/testing';

import { CategoriaAvaliacaoCircunferenciaService } from './categoria-avaliacao-circunferencia.service';

describe('CategoriaAvaliacaoCircunferenciaService', () => {
  let service: CategoriaAvaliacaoCircunferenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaAvaliacaoCircunferenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
