import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacaoPacienteComponent } from './informacao-paciente.component';

describe('InformacaoPacienteComponent', () => {
  let component: InformacaoPacienteComponent;
  let fixture: ComponentFixture<InformacaoPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacaoPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacaoPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
