import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import 'rxjs/add/observable/of';

import { ReceitaService } from '../../../../admin/services/receita.service';
import { Receita } from '../../../../admin/models/receita.model';

@Component({
  selector: 'app-receita',
  templateUrl: './receita.component.html',
  styleUrls: ['./receita.component.css']
})
export class ReceitaComponent implements OnInit {

  dataSource!: MatTableDataSource<Receita>;
  dados!: any[];
  colunas: string[] = ['titulo', 'categoria', 'acao'];
  usuarioId!: string;

  form!: FormGroup;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private receitaService: ReceitaService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.exibirReceitas();
  }

  exibirReceitas(){
    this.receitaService.listarReceitasPaciente()
      .subscribe(
        data => {
          const receitas = data['data'] as Receita[];
          this.dados = receitas;
          this.dataSource = new MatTableDataSource<Receita>(receitas);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        err => {
          const msg: string = "Erro obtendo receitas.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }

}
