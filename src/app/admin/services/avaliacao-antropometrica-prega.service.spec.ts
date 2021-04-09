import { TestBed } from '@angular/core/testing';

import { AvaliacaoAntropometricaPregaService } from './avaliacao-antropometrica-prega.service';

describe('AvaliacaoAntropometricaPregaService', () => {
  let service: AvaliacaoAntropometricaPregaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvaliacaoAntropometricaPregaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
