import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaAvaliacaoCircunferenciaComponent } from './categoria-avaliacao-circunferencia.component';

describe('CategoriaAvaliacaoCircunferenciaComponent', () => {
  let component: CategoriaAvaliacaoCircunferenciaComponent;
  let fixture: ComponentFixture<CategoriaAvaliacaoCircunferenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaAvaliacaoCircunferenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaAvaliacaoCircunferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
