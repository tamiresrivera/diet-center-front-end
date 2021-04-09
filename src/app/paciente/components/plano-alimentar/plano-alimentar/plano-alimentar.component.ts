import { Component, OnInit, ViewChild, Inject } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { HttpUtilService } from '../../../../shared/services';
import { PlanoService } from '../../../../shared/services/plano.service';
import { AgendaService } from '../../../../shared/services/agenda.service';
import { Plano } from '../../../../shared/models/plano.model';


import 'rxjs/add/observable/of';
import * as moment from 'moment';

@Component({
  selector: 'app-plano-alimentar',
  templateUrl: './plano-alimentar.component.html',
  styleUrls: ['./plano-alimentar.component.css']
})
export class PlanoAlimentarComponent implements OnInit {

  dataSource!: MatTableDataSource<Plano>;
  dados!: any[];
  colunas: string[] = ['hora', 'categoria', 'acao'];
  pacienteId!: string;
  dataConsulta!: string;
  consultaId!: string;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private planoService: PlanoService,
    private agendaService: AgendaService,
    private httpUtil: HttpUtilService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.pacienteId = this.httpUtil.obterIdUsuario();
    this.exibirPlanos();
    this.obterDadosAgenda();
  }

  exibirPlanos(){
    this.planoService.listarPlanoPorUsuarioId(this.pacienteId)
      .subscribe(
        data => {
          const planos = data['data'] as Plano[];
          this.dados = planos;
          this.dataSource = new MatTableDataSource<Plano>(planos);
          this.dataSource.sort = this.sort;
        },
        err => {
          const msg: string = "Erro obtendo plano alimentar.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }

  obterDadosAgenda(){
    this.agendaService.buscarUltimaPorUsuarioId()
      .subscribe(
        dados => {
          const data = dados.data.dataHora;
          if (data != null)
          {
            this.dataConsulta = moment(data).utc().format('DD/MM/YYYY HH:mm').toString();
            this.consultaId = dados.data.id;
          }
        },
        err => {
          let msg: string = "Erro obtendo plano alimentar.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }

  desmarcarDialog(id: string) {
    const dialog = this.dialog.open(ConfirmarDesmarcarDialog, {});
    dialog.afterClosed().subscribe(desmarcar => {
      if (desmarcar) {
        this.desmarcar(id);
      }
    });
  }

  desmarcar(id: string){
    this.agendaService.desmarcar(id)
      .subscribe(
        data => {
          const msg: string = "Horário desmarcado com sucesso!";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.router.navigate(['/paciente']);
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
  selector: 'confirmar-desmarcar-dialog',
  template: `
    <h1 mat-dialog-title class="mat-title">Deseja realmente desmarcar a consulta agendada?</h1>
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