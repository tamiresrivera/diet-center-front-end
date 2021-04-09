import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliacaoAntropometricaComponent } from './avaliacao-antropometrica.component';

describe('AvaliacaoAntropometricaComponent', () => {
  let component: AvaliacaoAntropometricaComponent;
  let fixture: ComponentFixture<AvaliacaoAntropometricaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvaliacaoAntropometricaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaliacaoAntropometricaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
