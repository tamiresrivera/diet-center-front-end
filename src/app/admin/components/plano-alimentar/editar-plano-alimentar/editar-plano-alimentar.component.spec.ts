import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPlanoAlimentarComponent } from './editar-plano-alimentar.component';

describe('EditarPlanoAlimentarComponent', () => {
  let component: EditarPlanoAlimentarComponent;
  let fixture: ComponentFixture<EditarPlanoAlimentarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarPlanoAlimentarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPlanoAlimentarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
