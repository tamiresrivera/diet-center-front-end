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

import { CategoriaAvaliacaoPregaService } from '../../../services/categoria-avaliacao-prega.service';
import { CategoriaAvaliacaoPrega } from '../../../models/categoria-avaliacao-prega.model';

@Component({
  selector: 'app-categoria-avaliacao-prega',
  templateUrl: './categoria-avaliacao-prega.component.html',
  styleUrls: ['./categoria-avaliacao-prega.component.css']
})
export class CategoriaAvaliacaoPregaComponent implements OnInit {

  dataSource!: MatTableDataSource<CategoriaAvaliacaoPrega>;
  dados!: any[];
  colunas: string[] = ['descricao', 'acao'];
  profissionalId!: string;

  form!: FormGroup;


  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private categoriaAvaliacaoPregaService: CategoriaAvaliacaoPregaService,
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
    const dialog = this.dialog.open(ConfirmarCategoriaAvaliacaoPregaDialog, {});
    dialog.afterClosed().subscribe(remover => {
      if (remover) {
        this.remover(id);
      }
    });
  }

  remover(id: string){
    this.categoriaAvaliacaoPregaService.remover(id)
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
    this.categoriaAvaliacaoPregaService.listarCategorias()
      .subscribe(
        data => {
          const categorias = data['data'] as CategoriaAvaliacaoPrega[];
          this.dados = categorias;
          this.dataSource = new MatTableDataSource<CategoriaAvaliacaoPrega>(categorias);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        err => {
          const msg: string = "Erro obtendo categorias.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }

  obterCategoria(dados: any): CategoriaAvaliacaoPrega {
    this.profissionalId = this.httpUtil.obterIdUsuario();

    return new CategoriaAvaliacaoPrega(
      dados.descricao,
      this.profissionalId
    );
  }

  cadastrar(){
    if (this.form.invalid) return;

    const dados = this.form.value;
    this.categoriaAvaliacaoPregaService.cadastrar(this.obterCategoria(dados))
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
    this.excelService.exportAsExcelFile(this.dados, 'categorias_avaliacao-pregas-cutaneas');
  }

}

@Component({
  selector: 'confirmar-categoria-avaliacao-prega-dialog',
  template: `
    <h1 mat-dialog-title class="mat-title">Deseja realmente remover a categoria?</h1>
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
export class ConfirmarCategoriaAvaliacaoPregaDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}