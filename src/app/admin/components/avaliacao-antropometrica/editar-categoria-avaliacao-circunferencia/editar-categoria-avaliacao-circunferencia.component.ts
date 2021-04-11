import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { HttpUtilService } from '../../../../shared';
import { CategoriaAvaliacaoCircunferenciaService } from '../../../services/categoria-avaliacao-circunferencia.service';
import { CategoriaAvaliacaoCircunferencia } from '../../../models/categoria-avaliacao-circunferencia.model';

@Component({
  selector: 'app-editar-categoria-avaliacao-circunferencia',
  templateUrl: './editar-categoria-avaliacao-circunferencia.component.html',
  styleUrls: ['./editar-categoria-avaliacao-circunferencia.component.css']
})
export class EditarCategoriaAvaliacaoCircunferenciaComponent implements OnInit {

  form!: FormGroup;
  profissionalId!: string;
  categoriaId!: string;

  constructor(
    private fb: FormBuilder,
    private httpUtil: HttpUtilService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private categoriaAvaliacaoCircunferenciaService: CategoriaAvaliacaoCircunferenciaService
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
    this.categoriaAvaliacaoCircunferenciaService.atualizar(this.obterCategoria(dados))
      .subscribe(
        dados => {
          const msg: string = "Categoria atualizada com sucesso";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.router.navigate(['/admin/categoria-avaliacao-circunferencia']);
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

  obterCategoria(dados: any): CategoriaAvaliacaoCircunferencia {
    this.profissionalId = this.httpUtil.obterIdUsuario();

    return new CategoriaAvaliacaoCircunferencia(
      dados.descricao,
      this.profissionalId,
      this.categoriaId
    );
  }

  obterDadosCategoria(){
    this.categoriaAvaliacaoCircunferenciaService.buscarPorId(this.categoriaId)
      .subscribe(
        dados => {
          const data = dados.data;
          this.form.get('descricao')!.setValue(dados.data.descricao);
        },
        err => {
          let msg: string = "Erro obtendo categoria";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
          this.router.navigate(['/admin/categoria-avaliacao-circunferencia']);
        }
      );
  }


}
