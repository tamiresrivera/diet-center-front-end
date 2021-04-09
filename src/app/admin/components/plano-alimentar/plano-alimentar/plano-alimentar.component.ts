import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSelect } from '@angular/material/select';

import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpUtilService } from '../../../../shared/services';

import 'rxjs/add/observable/of';

import { PlanoService } from '../../../../shared/services';
import { CategoriaPlanoAlimentarService } from '../../../services/categoria-plano-alimentar.service';
import { Plano } from '../../../../shared/models/plano.model';
import { CategoriaPlanoAlimentar } from '../../../models/categoria-plano-alimentar.model';

@Component({
  selector: 'app-plano-alimentar',
  templateUrl: './plano-alimentar.component.html',
  styleUrls: ['./plano-alimentar.component.css']
})
export class PlanoAlimentarComponent implements OnInit {

  dataSource!: MatTableDataSource<Plano>;
  dados!: any[];
  horas!: string[];
  minutos!: string[];
  colunas: string[] = ['hora', 'categoria', 'acao'];
  pacienteId!: string;
  profissionalId!: string;
  form!: FormGroup;

  categorias!: CategoriaPlanoAlimentar[];
  @ViewChild(MatSelect, { static: true }) matSelect!: MatSelect;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private planoService: PlanoService,
    private categoriaPlanoAlimentarService: CategoriaPlanoAlimentarService,
    private httpUtil: HttpUtilService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.pacienteId = this.route.snapshot.paramMap.get('pacienteId')!;
    this.horas = this.gerarListaNumeros(0, 23);
    this.minutos = this.gerarListaNumeros(0, 59);
    this.obterCategorias();
    this.gerarForm();
    this.exibirPlanos();
  }
  
  gerarForm(){
    this.form = this.fb.group({
      horas: ['', [Validators.required]],
      minutos: ['', [Validators.required]],
      cats: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      observacao: ['']
    })
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

  removerDialog(id: string) {
    const dialog = this.dialog.open(ConfirmarPlanoAlimentarDialog, {});
    dialog.afterClosed().subscribe(remover => {
      if (remover) {
        this.remover(id);
      }
    });
  }

  remover(id: string){
    this.planoService.remover(id)
      .subscribe(
        data => {
          const msg: string = "Plano Alimentar removido com sucesso!";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.exibirPlanos();
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

  exibirPlanos(){
    this.planoService.listarPlanoPorPacienteId(this.pacienteId)
      .subscribe(
        data => {
          const planos = data['data'] as Plano[];
          this.dados = planos;
          this.dataSource = new MatTableDataSource<Plano>(planos);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        err => {
          const msg: string = "Erro obtendo plano.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }

  obterPlano(dados: any): Plano {
    this.profissionalId = this.httpUtil.obterIdUsuario();

    return new Plano(
      dados.horas + ":" + dados.minutos,
      dados.descricao,
      dados.cats,
      this.profissionalId,
      this.pacienteId,
      dados.observacao
    );
  }

  cadastrar(){
    if (this.form.invalid) return;

    const dados = this.form.value;
    this.planoService.cadastrar(this.obterPlano(dados))
      .subscribe(
        data => {
          const msg: string = "Plano cadastrado com sucesso!";
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
    this.categoriaPlanoAlimentarService.listarCategorias()
      .subscribe(
        data => {
          this.categorias = (data.data as CategoriaPlanoAlimentar[]);
        },
        err => {
          const msg: string = "Erro obtendo pacientes.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }

}

@Component({
  selector: 'confirmar-plano-alimentar-dialog',
  template: `
    <h1 mat-dialog-title class="mat-title">Deseja realmente remover o registro?</h1>
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
export class ConfirmarPlanoAlimentarDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}