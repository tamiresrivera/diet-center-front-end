import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelect } from '@angular/material/select';

import { HttpUtilService } from '../../../../shared';
import { CategoriaReceitaService } from '../../../services/categoria-receita.service';
import { ReceitaService } from '../../../services/receita.service';
import { CategoriaReceita } from '../../../models/categoria-receita.model';
import { Receita } from '../../../models/receita.model';

@Component({
  selector: 'app-editar-receita',
  templateUrl: './editar-receita.component.html',
  styleUrls: ['./editar-receita.component.css']
})
export class EditarReceitaComponent implements OnInit {

  form!: FormGroup;
  profissionalId!: string;
  categoriaId!: string;
  receitaId!: string;

  categorias!: CategoriaReceita[];
  @ViewChild(MatSelect, { static: true }) matSelect!: MatSelect;

  constructor(
    private fb: FormBuilder,
    private httpUtil: HttpUtilService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private categoriaReceitaService: CategoriaReceitaService,
    private receitaService: ReceitaService
  ) { }

  ngOnInit(): void {
    this.receitaId = this.route.snapshot.paramMap.get('receitaId')!;
    this.gerarForm();
    this.obterDadosReceita();
    this.obterCategorias();
  }

  gerarForm(){
    this.form = this.fb.group({
      titulo: ['', [Validators.required]],
      cats: ['', [Validators.required]],
      descricao: ['', [Validators.required]]
    });
  }

  atualizar(){
    if (this.form.invalid) return;

    const dados = this.form.value;
    this.receitaService.atualizar(this.obterReceita(dados))
      .subscribe(
        dados => {
          const msg: string = "Receita atualizada com sucesso";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.router.navigate(['/admin/receita']);
        },
        err => {
          let msg: string = "Tente novamente em instantes.";
          if (err.status == 400) {
            msg = err.error.errors.join(' ');
          }
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      )
  }

  obterReceita(dados: any): Receita {
    this.profissionalId = this.httpUtil.obterIdUsuario();

    return new Receita(
      dados.titulo,
      dados.descricao,
      this.profissionalId,
      dados.cats,
      this.receitaId
    );
  }

  obterDadosReceita(){
    this.receitaService.buscarPorId(this.receitaId)
      .subscribe(
        dados => {
          const data = dados.data;
          this.form.get('titulo')!.setValue(dados.data.titulo);
          this.form.get('descricao')!.setValue(dados.data.descricao);
          this.form.get('cats')!.setValue(dados.data.categoriaReceitaId);
        },
        err => {
          let msg: string = "Erro obtendo categoria";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
          this.router.navigate(['/admin/receita']);
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