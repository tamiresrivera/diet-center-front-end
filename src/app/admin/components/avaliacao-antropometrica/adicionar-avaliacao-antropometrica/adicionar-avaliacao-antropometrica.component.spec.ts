import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarAvaliacaoAntropometricaComponent } from './adicionar-avaliacao-antropometrica.component';

describe('AdicionarAvaliacaoAntropometricaComponent', () => {
  let component: AdicionarAvaliacaoAntropometricaComponent;
  let fixture: ComponentFixture<AdicionarAvaliacaoAntropometricaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdicionarAvaliacaoAntropometricaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarAvaliacaoAntropometricaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
