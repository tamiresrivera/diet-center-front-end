import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelect } from '@angular/material/select';

import { Agenda, Paciente, HttpUtilService } from '../../../shared';
import { AgendaService } from '../../../shared/services/agenda.service';
import { ListagemService } from '../../services/listagem.service';

import * as moment from 'moment';

@Component({
  selector: 'app-associar-agenda',
  templateUrl: './associar-agenda.component.html',
  styleUrls: ['./associar-agenda.component.css']
})
export class AssociarAgendaComponent implements OnInit {

  form!: FormGroup;
  dataHora!: string;
  profissionalId!: string;
  pacienteId!: string;
  agendaId!: string;

  pacientes!: Paciente[];
  @ViewChild(MatSelect, { static: true }) matSelect!: MatSelect;

  constructor(
    private fb: FormBuilder,
    private httpUtil: HttpUtilService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private agendaService: AgendaService,
    private listagemService: ListagemService
  ) { }

  ngOnInit(): void {
    this.agendaId = this.route.snapshot.paramMap.get('agendaId')!;
    this.obterPacientes();
    this.gerarForm();
    this.obterDadosAgenda();
  }

  gerarForm(){
    this.form = this.fb.group({
      pacs: ['', [Validators.required]]
    });
  }

  atualizar(){
    if (this.form.invalid) return;

    const dados = this.form.value;
    this.agendaService.atualizar(this.obterAgenda(dados))
      .subscribe(
        dados => {
          const msg: string = "Agenda atualizada com sucesso";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.router.navigate(['/admin/agenda']);
        },
        err => {
          let msg: string = "Tente novamente em instantes.";
          if (err.status == 400) {
            msg = err.error.errors.join(' ');
          }
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      )

  }

  obterAgenda(dados: any): Agenda {
    this.profissionalId = this.httpUtil.obterIdUsuario();

    return new Agenda(
      '',
      this.profissionalId,
      dados.pacs,
      '',
      this.agendaId
    );
  }

  obterDadosAgenda(){
    this.agendaService.buscarPorId(this.agendaId)
      .subscribe(
        dados => {
          const data = dados.data.dataHora;
          
          this.dataHora = moment(data).utc().format('DD/MM/YYYY HH:mm').toString();
        },
        err => {
          let msg: string = "Erro obtendo agenda";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
          this.router.navigate(['/admin/agenda']);
        }
      );
  }

  obterPacientes(){
    this.listagemService.listarTodosPacientes()
      .subscribe(
        data => {
          const usuarioId: string = this.httpUtil.obterIdUsuario();
          this.pacientes = (data.data as Paciente[]);
        },
        err => {
          const msg: string = "Erro obtendo pacientes.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }

}
