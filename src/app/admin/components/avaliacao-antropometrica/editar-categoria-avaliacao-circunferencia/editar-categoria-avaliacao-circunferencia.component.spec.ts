import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCategoriaAvaliacaoCircunferenciaComponent } from './editar-categoria-avaliacao-circunferencia.component';

describe('EditarCategoriaAvaliacaoCircunferenciaComponent', () => {
  let component: EditarCategoriaAvaliacaoCircunferenciaComponent;
  let fixture: ComponentFixture<EditarCategoriaAvaliacaoCircunferenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCategoriaAvaliacaoCircunferenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCategoriaAvaliacaoCircunferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
