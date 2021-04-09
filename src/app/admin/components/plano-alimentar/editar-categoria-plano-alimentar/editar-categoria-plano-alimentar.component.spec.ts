import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCategoriaPlanoAlimentarComponent } from './editar-categoria-plano-alimentar.component';

describe('EditarCategoriaPlanoAlimentarComponent', () => {
  let component: EditarCategoriaPlanoAlimentarComponent;
  let fixture: ComponentFixture<EditarCategoriaPlanoAlimentarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCategoriaPlanoAlimentarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCategoriaPlanoAlimentarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
