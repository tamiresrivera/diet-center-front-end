import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import 'rxjs/add/observable/of';

import { AgendaService } from '../../../../shared/services/agenda.service';
import { Agenda } from '../../../../shared/models/agenda.model';

import { HttpUtilService } from '../../../../shared/services';

@Component({
  selector: 'app-agenda-profissional',
  templateUrl: './agenda-profissional.component.html',
  styleUrls: ['./agenda-profissional.component.css']
})
export class AgendaProfissionalComponent implements OnInit {

  dados!: any[];
  agenda!: Agenda;
  dataSource!: MatTableDataSource<Agenda>;
  colunas: string[] = ['dataHora', 'acao'];
  profissionalId!: string;
  pacienteId!: string;
  totalAgenda!: number;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private agendaService: AgendaService,
    private httpUtil: HttpUtilService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.profissionalId = this.route.snapshot.paramMap.get('profissionalId')!;
    this.pacienteId = this.httpUtil.obterIdUsuario();
    this.exibirAgenda();
  }

  exibirAgenda(){
    this.agendaService.listarAgendaPorProfissionalDisponivel(this.profissionalId)
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

  agendarDialog(id: string) {
    const dialog = this.dialog.open(ConfirmarAgendarDialog, {});
    dialog.afterClosed().subscribe(agendar => {
      if (agendar) {
        this.agendar(id);
      }
    });
  }

  obterAgenda(id: string): Agenda {
    return new Agenda(
      '',
      this.profissionalId,
      '',
      '',
      id
    );
  }

  agendar(id: string){
    this.agendaService.agendar(this.obterAgenda(id))
      .subscribe(
        data => {
          const msg: string = "Horário agendado com sucesso!";
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
  selector: 'confirmar-agendar-dialog',
  template: `
    <h1 mat-dialog-title class="mat-title">Deseja realmente agendar o horário da agenda?</h1>
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
export class ConfirmarAgendarDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
