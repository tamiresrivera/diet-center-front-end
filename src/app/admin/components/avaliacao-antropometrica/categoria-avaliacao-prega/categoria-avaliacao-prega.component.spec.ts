import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaAvaliacaoPregaComponent } from './categoria-avaliacao-prega.component';

describe('CategoriaAvaliacaoPregaComponent', () => {
  let component: CategoriaAvaliacaoPregaComponent;
  let fixture: ComponentFixture<CategoriaAvaliacaoPregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaAvaliacaoPregaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaAvaliacaoPregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
