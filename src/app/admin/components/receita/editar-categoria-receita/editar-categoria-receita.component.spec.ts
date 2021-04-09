import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCategoriaReceitaComponent } from './editar-categoria-receita.component';

describe('EditarCategoriaReceitaComponent', () => {
  let component: EditarCategoriaReceitaComponent;
  let fixture: ComponentFixture<EditarCategoriaReceitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCategoriaReceitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCategoriaReceitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
