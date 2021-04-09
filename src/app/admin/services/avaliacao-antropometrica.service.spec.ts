import { TestBed } from '@angular/core/testing';

import { AvaliacaoAntropometricaService } from './avaliacao-antropometrica.service';

describe('AvaliacaoAntropometricaService', () => {
  let service: AvaliacaoAntropometricaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvaliacaoAntropometricaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
