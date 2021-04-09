import { Component, OnInit, ViewChild, Inject } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelect } from '@angular/material/select';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpUtilService } from '../../../../shared/services';
import 'rxjs/add/observable/of';

import { ReceitaService } from '../../../services/receita.service';
import { CategoriaReceitaService } from '../../../services/categoria-receita.service';
import { Receita } from '../../../models/receita.model';
import { CategoriaReceita } from '../../../models/categoria-receita.model';

@Component({
  selector: 'app-receita',
  templateUrl: './receita.component.html',
  styleUrls: ['./receita.component.css']
})
export class ReceitaComponent implements OnInit {

  dataSource!: MatTableDataSource<Receita>;
  dados!: any[];
  colunas: string[] = ['titulo', 'categoria', 'acao'];
  profissionalId!: string;

  form!: FormGroup;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  categorias!: CategoriaReceita[];
  @ViewChild(MatSelect, { static: true }) matSelect!: MatSelect;

  constructor(
    private receitaService: ReceitaService,
    private categoriaReceitaService: CategoriaReceitaService,
    private httpUtil: HttpUtilService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.obterCategorias();
    this.gerarForm();
    this.exibirReceitas();
  }
  
  gerarForm(){
    this.form = this.fb.group({
      titulo: ['', [Validators.required]],
      cats: ['', [Validators.required]],
      descricao: ['', [Validators.required]]
    })
  }

  removerDialog(id: string) {
    const dialog = this.dialog.open(ConfirmarReceitaDialog, {});
    dialog.afterClosed().subscribe(remover => {
      if (remover) {
        this.remover(id);
      }
    });
  }

  remover(id: string){
    this.receitaService.remover(id)
      .subscribe(
        data => {
          const msg: string = "Receita removida com sucesso!";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.exibirReceitas();
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

  exibirReceitas(){
    this.receitaService.listarReceitas()
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

  obterReceita(dados: any): Receita {
    this.profissionalId = this.httpUtil.obterIdUsuario();

    return new Receita(
      dados.titulo,
      dados.descricao,
      this.profissionalId,
      dados.cats
    );
  }

  cadastrar(){
    if (this.form.invalid) return;

    const dados = this.form.value;
    this.receitaService.cadastrar(this.obterReceita(dados))
      .subscribe(
        data => {
          const msg: string = "Receita cadastrada com sucesso!";
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

  obterCategorias(){
    this.categoriaReceitaService.listarCategorias()
      .subscribe(
        data => {
          const usuarioId: string = this.httpUtil.obterIdUsuario();
          this.categorias = (data.data as CategoriaReceita[]);
        },
        err => {
          const msg: string = "Erro obtendo categorias.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }

}

@Component({
  selector: 'confirmar-receita-dialog',
  template: `
    <h1 mat-dialog-title class="mat-title">Deseja realmente remover a receita?</h1>
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
export class ConfirmarReceitaDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}