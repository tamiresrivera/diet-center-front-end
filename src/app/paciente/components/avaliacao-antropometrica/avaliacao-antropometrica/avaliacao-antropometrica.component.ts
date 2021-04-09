import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MatDialog } from '@angular/material/dialog';
import { HttpUtilService } from '../../../../shared/services';
import 'rxjs/add/observable/of';

import { AvaliacaoAntropometricaService } from '../../../../admin/services/avaliacao-antropometrica.service';
import { AvaliacaoAntropometrica } from '../../../../admin/models/avaliacao-antropometrica.model';

@Component({
  selector: 'app-avaliacao-antropometrica',
  templateUrl: './avaliacao-antropometrica.component.html',
  styleUrls: ['./avaliacao-antropometrica.component.css']
})
export class AvaliacaoAntropometricaComponent implements OnInit {

  dataSource!: MatTableDataSource<AvaliacaoAntropometrica>;
  dados!: any[];
  colunas: string[] = ['dataHora', 'altura', 'peso', 'imc', 'acao'];
  usuarioId!: string;

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
    this.usuarioId = this.httpUtil.obterIdUsuario();
    this.exibirAvaliacoes();
  }

  exibirAvaliacoes(){
    this.avaliacaoAntropometricaService.listarAvaliacoesUsuario()
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