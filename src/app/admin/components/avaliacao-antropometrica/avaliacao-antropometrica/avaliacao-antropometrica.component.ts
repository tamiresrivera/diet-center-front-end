import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpUtilService } from '../../../../shared/services';
import 'rxjs/add/observable/of';

import { AvaliacaoAntropometricaService } from '../../../services/avaliacao-antropometrica.service';
import { AvaliacaoAntropometrica } from '../../../models/avaliacao-antropometrica.model';

@Component({
  selector: 'app-avaliacao-antropometrica',
  templateUrl: './avaliacao-antropometrica.component.html',
  styleUrls: ['./avaliacao-antropometrica.component.css']
})
export class AvaliacaoAntropometricaComponent implements OnInit {

  dataSource!: MatTableDataSource<AvaliacaoAntropometrica>;
  dados!: any[];
  colunas: string[] = ['dataHora', 'altura', 'peso', 'imc', 'acao'];
  pacienteId!: string;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private avaliacaoAntropometricaService: AvaliacaoAntropometricaService,
    private httpUtil: HttpUtilService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.pacienteId = this.route.snapshot.paramMap.get('pacienteId')!;
    this.exibirAvaliacoes();
  }

  removerDialog(id: string) {
    const dialog = this.dialog.open(ConfirmarAvaliacaoAntropometricaDialog, {});
    dialog.afterClosed().subscribe(remover => {
      if (remover) {
        this.remover(id);
      }
    });
  }

  remover(id: string){
    this.avaliacaoAntropometricaService.remover(id)
      .subscribe(
        data => {
          const msg: string = "Avaliação removida com sucesso!";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.exibirAvaliacoes();
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

  exibirAvaliacoes(){
    this.avaliacaoAntropometricaService.listarAvaliacoes(this.pacienteId)
      .subscribe(
        data => {
          const avaliacoes = data['data'] as AvaliacaoAntropometrica[];
          this.dados = avaliacoes;
          this.dataSource = new MatTableDataSource<AvaliacaoAntropometrica>(avaliacoes);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        err => {
          const msg: string = "Erro obtendo avaliações.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }

}

@Component({
  selector: 'confirmar-avaliacao-antropometrica-dialog',
  template: `
    <h1 mat-dialog-title class="mat-title">Deseja realmente remover a avaliação?</h1>
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
export class ConfirmarAvaliacaoAntropometricaDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
