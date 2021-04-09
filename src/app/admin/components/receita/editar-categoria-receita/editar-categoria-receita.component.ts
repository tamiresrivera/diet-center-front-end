import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { HttpUtilService } from '../../../../shared';
import { CategoriaReceitaService } from '../../../services/categoria-receita.service';
import { CategoriaReceita } from '../../../models/categoria-receita.model';

@Component({
  selector: 'app-editar-categoria-receitas',
  templateUrl: './editar-categoria-receita.component.html',
  styleUrls: ['./editar-categoria-receita.component.css']
})
export class EditarCategoriaReceitaComponent implements OnInit {

  form!: FormGroup;
  profissionalId!: string;
  categoriaId!: string;

  constructor(
    private fb: FormBuilder,
    private httpUtil: HttpUtilService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private categoriaReceitaService: CategoriaReceitaService
  ) { }

  ngOnInit(): void {
    this.categoriaId = this.route.snapshot.paramMap.get('categoriaId')!;
    this.gerarForm();
    this.obterDadosCategoria();
  }

  gerarForm(){
    this.form = this.fb.group({
      descricao: ['', [Validators.required]]
    });
  }

  atualizar(){
    if (this.form.invalid) return;

    const dados = this.form.value;
    this.categoriaReceitaService.atualizar(this.obterCategoria(dados))
      .subscribe(
        dados => {
          const msg: string = "Categoria atualizada com sucesso";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.router.navigate(['/admin/categoria-receita']);
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

  obterCategoria(dados: any): CategoriaReceita {
    this.profissionalId = this.httpUtil.obterIdUsuario();

    return new CategoriaReceita(
      dados.descricao,
      this.profissionalId,
      this.categoriaId
    );
  }

  obterDadosCategoria(){
    this.categoriaReceitaService.buscarPorId(this.categoriaId)
      .subscribe(
        dados => {
          const data = dados.data;
          this.form.get('descricao')!.setValue(dados.data.descricao);
        },
        err => {
          let msg: string = "Erro obtendo categoria";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
          this.router.navigate(['/admin/receita']);
        }
      );
  }


}
