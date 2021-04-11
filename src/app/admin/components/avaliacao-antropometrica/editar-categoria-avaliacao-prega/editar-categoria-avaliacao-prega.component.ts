import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelect } from '@angular/material/select';

import { HttpUtilService } from '../../../../shared';
import { CategoriaAvaliacaoPregaService } from '../../../services/categoria-avaliacao-prega.service';
import { CategoriaAvaliacaoPrega } from '../../../models/categoria-avaliacao-prega.model';

import * as moment from 'moment';

@Component({
  selector: 'app-editar-categoria-avaliacao-prega',
  templateUrl: './editar-categoria-avaliacao-prega.component.html',
  styleUrls: ['./editar-categoria-avaliacao-prega.component.css']
})
export class EditarCategoriaAvaliacaoPregaComponent implements OnInit {

  form!: FormGroup;
  profissionalId!: string;
  categoriaId!: string;

  constructor(
    private fb: FormBuilder,
    private httpUtil: HttpUtilService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private categoriaAvaliacaoPregaService: CategoriaAvaliacaoPregaService
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
    this.categoriaAvaliacaoPregaService.atualizar(this.obterCategoria(dados))
      .subscribe(
        dados => {
          const msg: string = "Categoria atualizada com sucesso";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.router.navigate(['/admin/ategoria-avaliacao-prega']);
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

  obterCategoria(dados: any): CategoriaAvaliacaoPrega {
    this.profissionalId = this.httpUtil.obterIdUsuario();

    return new CategoriaAvaliacaoPrega(
      dados.descricao,
      this.profissionalId,
      this.categoriaId
    );
  }

  obterDadosCategoria(){
    this.categoriaAvaliacaoPregaService.buscarPorId(this.categoriaId)
      .subscribe(
        dados => {
          const data = dados.data;
          this.form.get('descricao')!.setValue(dados.data.descricao);
        },
        err => {
          let msg: string = "Erro obtendo categoria";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
          this.router.navigate(['/admin/editar-avaliacao-prega']);
        }
      );
  }


}
