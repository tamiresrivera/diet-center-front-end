import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaAvaliacaoDiametroOsseoComponent } from './categoria-avaliacao-diametro-osseo.component';

describe('CategoriaAvaliacaoDiametroOsseoComponent', () => {
  let component: CategoriaAvaliacaoDiametroOsseoComponent;
  let fixture: ComponentFixture<CategoriaAvaliacaoDiametroOsseoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaAvaliacaoDiametroOsseoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaAvaliacaoDiametroOsseoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
