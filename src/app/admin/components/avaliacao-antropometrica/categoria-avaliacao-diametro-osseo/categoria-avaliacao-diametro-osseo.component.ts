import { Component, OnInit, ViewChild, Inject } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpUtilService } from '../../../../shared/services';
import { ExcelService } from '../../../../shared/services';
import 'rxjs/add/observable/of';

import { CategoriaAvaliacaoDiametroOsseoService } from '../../../services/categoria-avaliacao-diametro-osseo.service';
import { CategoriaAvaliacaoDiametroOsseo } from '../../../models/categoria-avaliacao-diametro-osseo.model';

@Component({
  selector: 'app-categoria-avaliacao-diametro-osseo',
  templateUrl: './categoria-avaliacao-diametro-osseo.component.html',
  styleUrls: ['./categoria-avaliacao-diametro-osseo.component.css']
})
export class CategoriaAvaliacaoDiametroOsseoComponent implements OnInit {

  dataSource!: MatTableDataSource<CategoriaAvaliacaoDiametroOsseo>;
  dados!: any[];
  colunas: string[] = ['descricao', 'acao'];
  profissionalId!: string;

  form!: FormGroup;


  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private categoriaAvaliacaoDiametroOsseoService: CategoriaAvaliacaoDiametroOsseoService,
    private httpUtil: HttpUtilService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private excelService:ExcelService
  ) { }

  ngOnInit(): void {
    this.gerarForm();
    this.exibirCategorias();
  }
  
  gerarForm(){
    this.form = this.fb.group({
      descricao: ['', [Validators.required]]
    })
  }

  removerDialog(id: string) {
    const dialog = this.dialog.open(ConfirmarCategoriaAvaliacaoDiametroOsseoDialog, {});
    dialog.afterClosed().subscribe(remover => {
      if (remover) {
        this.remover(id);
      }
    });
  }

  remover(id: string){
    this.categoriaAvaliacaoDiametroOsseoService.remover(id)
      .subscribe(
        data => {
          const msg: string = "Categoria removida com sucesso!";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.exibirCategorias();
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

  exibirCategorias(){
    this.categoriaAvaliacaoDiametroOsseoService.listarCategorias()
      .subscribe(
        data => {
          const categorias = data['data'] as CategoriaAvaliacaoDiametroOsseo[];
          this.dados = categorias;
          this.dataSource = new MatTableDataSource<CategoriaAvaliacaoDiametroOsseo>(categorias);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        err => {
          const msg: string = "Erro obtendo categorias.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }

  obterCategoria(dados: any): CategoriaAvaliacaoDiametroOsseo {
    this.profissionalId = this.httpUtil.obterIdUsuario();

    return new CategoriaAvaliacaoDiametroOsseo(
      dados.descricao,
      this.profissionalId
    );
  }

  cadastrar(){
    if (this.form.invalid) return;

    const dados = this.form.value;
    this.categoriaAvaliacaoDiametroOsseoService.cadastrar(this.obterCategoria(dados))
      .subscribe(
        data => {
          const msg: string = "Categoria cadastrada com sucesso!";
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

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.dados, 'categorias_avaliacao-diametros-osseos');
  }

}

@Component({
  selector: 'confirmar-categoria-avaliacao-diametro-osseo-dialog',
  template: `
    <h1 mat-dialog-title class="mat-title">Deseja realmente remover a categoria?</h1>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false" tabindex="-1">
        N??o
      </button>
      <button mat-button [mat-dialog-close]="true" tabindex="2">
        Sim
      </button>
    </div>
  `,
})
export class ConfirmarCategoriaAvaliacaoDiametroOsseoDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}