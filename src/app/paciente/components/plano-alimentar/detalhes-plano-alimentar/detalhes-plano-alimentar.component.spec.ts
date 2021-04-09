import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesPlanoAlimentarComponent } from './detalhes-plano-alimentar.component';

describe('DetalhesPlanoAlimentarComponent', () => {
  let component: DetalhesPlanoAlimentarComponent;
  let fixture: ComponentFixture<DetalhesPlanoAlimentarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesPlanoAlimentarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesPlanoAlimentarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
