import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociarAgendaComponent } from './associar-agenda.component';

describe('AssociarAgendaComponent', () => {
  let component: AssociarAgendaComponent;
  let fixture: ComponentFixture<AssociarAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociarAgendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociarAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
