import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCategoriaAvaliacaoDiametroOsseoComponent } from './editar-categoria-avaliacao-diametro-osseo.component';

describe('EditarCategoriaAvaliacaoDiametroOsseoComponent', () => {
  let component: EditarCategoriaAvaliacaoDiametroOsseoComponent;
  let fixture: ComponentFixture<EditarCategoriaAvaliacaoDiametroOsseoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCategoriaAvaliacaoDiametroOsseoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCategoriaAvaliacaoDiametroOsseoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
