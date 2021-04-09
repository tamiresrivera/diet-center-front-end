import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolucaoAvaliacaoAntropometricaComponent } from './evolucao-avaliacao-antropometrica.component';

describe('EvolucaoAvaliacaoAntropometricaComponent', () => {
  let component: EvolucaoAvaliacaoAntropometricaComponent;
  let fixture: ComponentFixture<EvolucaoAvaliacaoAntropometricaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvolucaoAvaliacaoAntropometricaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvolucaoAvaliacaoAntropometricaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
