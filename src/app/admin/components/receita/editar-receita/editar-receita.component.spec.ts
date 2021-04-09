import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarReceitaComponent } from './editar-receita.component';

describe('EditarReceitaComponent', () => {
  let component: EditarReceitaComponent;
  let fixture: ComponentFixture<EditarReceitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarReceitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarReceitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
