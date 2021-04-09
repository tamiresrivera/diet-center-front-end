import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { HttpUtilService } from '../../../../shared';
import { CategoriaPlanoAlimentarService } from '../../../services/categoria-plano-alimentar.service';
import { CategoriaPlanoAlimentar } from '../../../models/categoria-plano-alimentar.model';

@Component({
  selector: 'app-editar-categoria-plano-alimentar',
  templateUrl: './editar-categoria-plano-alimentar.component.html',
  styleUrls: ['./editar-categoria-plano-alimentar.component.css']
})
export class EditarCategoriaPlanoAlimentarComponent implements OnInit {

  form!: FormGroup;
  profissionalId!: string;
  categoriaId!: string;

  constructor(
    private fb: FormBuilder,
    private httpUtil: HttpUtilService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private categoriaPlanoAlimentarService: CategoriaPlanoAlimentarService
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
    this.categoriaPlanoAlimentarService.atualizar(this.obterCategoria(dados))
      .subscribe(
        dados => {
          const msg: string = "Categoria atualizada com sucesso";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.router.navigate(['/admin/categoria-plano-alimentar']);
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

  obterCategoria(dados: any): CategoriaPlanoAlimentar {
    this.profissionalId = this.httpUtil.obterIdUsuario();

    return new CategoriaPlanoAlimentar(
      dados.descricao,
      this.profissionalId,
      this.categoriaId
    );
  }

  obterDadosCategoria(){
    this.categoriaPlanoAlimentarService.buscarPorId(this.categoriaId)
      .subscribe(
        dados => {
          const data = dados.data;
          this.form.get('descricao')!.setValue(dados.data.descricao);
        },
        err => {
          let msg: string = "Erro obtendo categoria";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
          this.router.navigate(['/admin/plano-alimentar']);
        }
      );
  }


}
