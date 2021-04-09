import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesAvaliacaoAntropometricaComponent } from './detalhes-avaliacao-antropometrica.component';

describe('DetalhesAvaliacaoAntropometricaComponent', () => {
  let component: DetalhesAvaliacaoAntropometricaComponent;
  let fixture: ComponentFixture<DetalhesAvaliacaoAntropometricaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesAvaliacaoAntropometricaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesAvaliacaoAntropometricaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
