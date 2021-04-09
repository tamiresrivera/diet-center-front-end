import { TestBed } from '@angular/core/testing';

import { AvaliacaoAntropometricaDiametroService } from './avaliacao-antropometrica-diametro.service';

describe('AvaliacaoAntropometricaDiametroService', () => {
  let service: AvaliacaoAntropometricaDiametroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvaliacaoAntropometricaDiametroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
