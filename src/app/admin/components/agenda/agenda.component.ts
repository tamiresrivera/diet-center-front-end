import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSelect } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import 'rxjs/add/observable/of';

import { AgendaService } from '../../../shared/services/agenda.service';
import { ListagemService } from '../../services/listagem.service';
import { Agenda } from '../../../shared/models/agenda.model';

import { HttpUtilService } from '../../../shared/services';
import { Paciente } from '../../../shared/models';

import * as moment from 'moment';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  form!: FormGroup;
  data!: string;
  horas!: string[];
  minutos!: string[];

  dados!: any[];
  dataSource!: MatTableDataSource<Agenda>;
  colunas: string[] = ['dataHora', 'nomePaciente', 'acao'];
  profissionalId!: string;
  pacienteId!: string;
  totalAgenda!: number;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  pacientes!: Paciente[];
  @ViewChild(MatSelect, { static: true }) matSelect!: MatSelect;

  constructor(
    private agendaService: AgendaService,
    private listagemService: ListagemService,
    private httpUtil: HttpUtilService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.gerarForm();
    this.horas = this.gerarListaNumeros(0, 23);
    this.minutos = this.gerarListaNumeros(0, 59);
    this.exibirAgenda();

  }

  gerarForm(){
    this.form = this.fb.group({
      data: ['', [Validators.required]],
      horas: ['', [Validators.required]],
      minutos: ['', [Validators.required]]
    })
  }

  get pacId(): string {
    return sessionStorage['pacienteId'] || false;
  }

  gerarListaNumeros(inicio: number, termino: number): string[] {
    const numeros: string[] = Array();
    for (let i = inicio; i <= termino; i++) {
      let numero: string = i.toString();
      if (i < 10) {
        numero = "0" + numero;
      }
      numeros.push(numero);
    }
    return numeros;
  }

  exibirAgenda(){
    this.profissionalId = this.httpUtil.obterIdUsuario();

    this.agendaService.listarAgendaPorProfissionalTodos()
      .subscribe(
        data => {
          const horarios = data['data'] as Agenda[];
          this.dados = horarios;
          this.dataSource = new MatTableDataSource<Agenda>(horarios);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        err => {
          const msg: string = "Erro obtendo agenda.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }

  cadastrar(){
    if (this.form.invalid) return;

    const dados = this.form.value;
    this.agendaService.cadastrar(this.obterAgenda(dados))
      .subscribe(
        data => {
          const msg: string = "Horário cadastrado com sucesso!";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          location.reload();
        },
        err => {
          let msg: string = "Tente novamente em instantes.";
          if (err.status == 400) {
            msg = err.error.errors.join(' ');
          }
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }

  obterAgenda(dados: any): Agenda{
    this.profissionalId = this.httpUtil.obterIdUsuario();
    const data = moment(dados.data);
    data.set({
      hour: dados.horas,
      minute: dados.minutos,
      second: 0
    });

    return new Agenda(
      data.format('YYYY-MM-DDTHH:mm:ss'),
      this.profissionalId,
      ''
    );
  }

  removerDialog(id: string) {
    const dialog = this.dialog.open(ConfirmarDialog, {});
    dialog.afterClosed().subscribe(remover => {
      if (remover) {
        this.remover(id);
      }
    });
  }

  desmarcarDialog(id: string) {
    const dialog = this.dialog.open(ConfirmarDesmarcarDialog, {});
    dialog.afterClosed().subscribe(desmarcar => {
      if (desmarcar) {
        this.desmarcar(id);
      }
    });
  }

  remover(id: string){
    this.agendaService.remover(id)
      .subscribe(
        data => {
          const msg: string = "Horário removido da agenda com sucesso!";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.exibirAgenda();
        },
        err => {
          let msg: string = "Tente novamente em instantes.";
          if (err.status == 400) {
            msg = err.error.errors.join(' ');
          }
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }

  desmarcar(id: string){
    this.agendaService.desmarcar(id)
      .subscribe(
        data => {
          const msg: string = "Horário desmarcado com sucesso!";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.exibirAgenda();
        },
        err => {
          let msg: string = "Tente novamente em instantes.";
          if (err.status == 400) {
            msg = err.error.errors.join(' ');
          }
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }

}

@Component({
  selector: 'confirmar-dialog',
  template: `
    <h1 mat-dialog-title class="mat-title">Deseja realmente remover o horário da agenda?</h1>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false" tabindex="-1">
        Não
      </button>
      <button mat-button [mat-dialog-close]="true" tabindex="2">
        Sim
      </button>
    </div>
  `,
})
export class ConfirmarDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}

@Component({
  selector: 'confirmar-desmarcar-dialog',
  template: `
    <h1 mat-dialog-title class="mat-title">Deseja realmente remover o paciente do horário marcado?</h1>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false" tabindex="-1">
        Não
      </button>
      <button mat-button [mat-dialog-close]="true" tabindex="2">
        Sim
      </button>
    </div>
  `,
})
export class ConfirmarDesmarcarDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}