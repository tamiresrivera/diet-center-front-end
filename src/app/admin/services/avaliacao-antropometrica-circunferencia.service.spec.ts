import { TestBed } from '@angular/core/testing';

import { AvaliacaoAntropometricaCircunferenciaService } from './avaliacao-antropometrica-circunferencia.service';

describe('AvaliacaoAntropometricaCircunferenciaService', () => {
  let service: AvaliacaoAntropometricaCircunferenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvaliacaoAntropometricaCircunferenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
