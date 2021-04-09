import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCategoriaAvaliacaoPregaComponent } from './editar-categoria-avaliacao-prega.component';

describe('EditarCategoriaAvaliacaoPregaComponent', () => {
  let component: EditarCategoriaAvaliacaoPregaComponent;
  let fixture: ComponentFixture<EditarCategoriaAvaliacaoPregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCategoriaAvaliacaoPregaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCategoriaAvaliacaoPregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
