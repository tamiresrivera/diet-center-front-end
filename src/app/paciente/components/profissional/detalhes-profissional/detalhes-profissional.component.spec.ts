import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesProfissionalComponent } from './detalhes-profissional.component';

describe('DetalhesProfissionalComponent', () => {
  let component: DetalhesProfissionalComponent;
  let fixture: ComponentFixture<DetalhesProfissionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesProfissionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesProfissionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
