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

import { CategoriaPlanoAlimentarService } from '../../../services/categoria-plano-alimentar.service';
import { CategoriaPlanoAlimentar } from '../../../models/categoria-plano-alimentar.model';

@Component({
  selector: 'app-categoria-plano-alimentar',
  templateUrl: './categoria-plano-alimentar.component.html',
  styleUrls: ['./categoria-plano-alimentar.component.css']
})
export class CategoriaPlanoAlimentarComponent implements OnInit {

  dataSource!: MatTableDataSource<CategoriaPlanoAlimentar>;
  dados!: any[];
  colunas: string[] = ['descricao', 'acao'];
  profissionalId!: string;

  form!: FormGroup;


  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private categoriaPlanoAlimentarService: CategoriaPlanoAlimentarService,
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
    const dialog = this.dialog.open(ConfirmarCategoriaPlanoAlimentarDialog, {});
    dialog.afterClosed().subscribe(remover => {
      if (remover) {
        this.remover(id);
      }
    });
  }

  remover(id: string){
    this.categoriaPlanoAlimentarService.remover(id)
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
    this.categoriaPlanoAlimentarService.listarCategorias()
      .subscribe(
        data => {
          const categorias = data['data'] as CategoriaPlanoAlimentar[];
          this.dados = categorias;
          this.dataSource = new MatTableDataSource<CategoriaPlanoAlimentar>(categorias);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        err => {
          const msg: string = "Erro obtendo categorias.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }

  obterCategoria(dados: any): CategoriaPlanoAlimentar {
    this.profissionalId = this.httpUtil.obterIdUsuario();

    return new CategoriaPlanoAlimentar(
      dados.descricao,
      this.profissionalId
    );
  }

  cadastrar(){
    if (this.form.invalid) return;

    const dados = this.form.value;
    this.categoriaPlanoAlimentarService.cadastrar(this.obterCategoria(dados))
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
    this.excelService.exportAsExcelFile(this.dados, 'categorias_plano-alimentar');
  }

}

@Component({
  selector: 'confirmar-categoria-plano-alimentar-dialog',
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
export class ConfirmarCategoriaPlanoAlimentarDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}