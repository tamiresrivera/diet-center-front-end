import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeuProfissionalComponent } from './meu-profissional.component';

describe('MeuProfissionalComponent', () => {
  let component: MeuProfissionalComponent;
  let fixture: ComponentFixture<MeuProfissionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeuProfissionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeuProfissionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
