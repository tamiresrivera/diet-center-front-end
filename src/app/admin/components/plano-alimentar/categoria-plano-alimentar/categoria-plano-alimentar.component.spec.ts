import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaPlanoAlimentarComponent } from './categoria-plano-alimentar.component';

describe('CategoriaPlanoAlimentarComponent', () => {
  let component: CategoriaPlanoAlimentarComponent;
  let fixture: ComponentFixture<CategoriaPlanoAlimentarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaPlanoAlimentarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaPlanoAlimentarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
