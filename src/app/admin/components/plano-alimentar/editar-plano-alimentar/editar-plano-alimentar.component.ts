import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelect } from '@angular/material/select';

import { HttpUtilService } from '../../../../shared';
import { CategoriaPlanoAlimentarService } from '../../../services/categoria-plano-alimentar.service';
import { PlanoService } from '../../../../shared/services';
import { CategoriaPlanoAlimentar } from '../../../models/categoria-plano-alimentar.model';
import { Plano } from '../../../../shared/models/plano.model';

@Component({
  selector: 'app-editar-plano-alimentar',
  templateUrl: './editar-plano-alimentar.component.html',
  styleUrls: ['./editar-plano-alimentar.component.css']
})
export class EditarPlanoAlimentarComponent implements OnInit {

  form!: FormGroup;
  horas!: string[];
  minutos!: string[];
  profissionalId!: string;
  pacienteId!: string;
  usuarioPacienteId!: string;
  categoriaId!: string;
  planoId!: string;

  categorias!: CategoriaPlanoAlimentar[];
  @ViewChild(MatSelect, { static: true }) matSelect!: MatSelect;

  constructor(
    private fb: FormBuilder,
    private httpUtil: HttpUtilService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private categoriaPlanoAlimentarService: CategoriaPlanoAlimentarService,
    private planoService: PlanoService
  ) { }

  ngOnInit(): void {
    this.planoId = this.route.snapshot.paramMap.get('planoId')!;
    this.horas = this.gerarListaNumeros(0, 23);
    this.minutos = this.gerarListaNumeros(0, 59);
    this.obterDadosPlano();
    this.obterCategorias();
    this.gerarForm();
  }

  gerarForm(){
    this.form = this.fb.group({
      horas: ['', [Validators.required]],
      minutos: ['', [Validators.required]],
      cats: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      observacao: ['']
    });
  }

  atualizar(){
    if (this.form.invalid) return;

    const dados = this.form.value;
    this.planoService.atualizar(this.obterPlano(dados))
      .subscribe(
        dados => {
          const msg: string = "Plano Alimentar atualizado com sucesso";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.router.navigate(['/admin/plano-alimentar' + this.usuarioPacienteId]);
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

  obterPlano(dados: any): Plano {
    this.profissionalId = this.httpUtil.obterIdUsuario();

    return new Plano(
      dados.horas + ":" + dados.minutos,
      dados.descricao,
      dados.cats,
      this.profissionalId,
      this.pacienteId,
      dados.observacao,
      '',
      this.planoId
    );
  }

  obterDadosPlano(){
    this.planoService.buscarPorId(this.planoId)
      .subscribe(
        dados => {
          const data = dados.data;
          const horas: string = dados.data.hora;
          this.pacienteId = dados.data.pacienteId;
          this.usuarioPacienteId = dados.data.usuarioPacienteId;  
          this.form.get('horas')!.setValue(horas.substr(0,2));
          this.form.get('minutos')!.setValue(horas.substr(3,2));
          this.form.get('descricao')!.setValue(dados.data.descricao);
          this.form.get('observacao')!.setValue(dados.data.observacao);
          this.form.get('cats')!.setValue(dados.data.categoriaPlanoAlimentarId);
        },
        err => {
          let msg: string = "Erro obtendo categoria";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
          this.router.navigate(['/admin/plano-alimentar' + this.usuarioPacienteId]);
        }
      );
  }

  obterCategorias(){
    this.categoriaPlanoAlimentarService.listarCategorias()
      .subscribe(
        data => {
          const usuarioId: string = this.httpUtil.obterIdUsuario();
          this.categorias = (data.data as CategoriaPlanoAlimentar[]);
        },
        err => {
          const msg: string = "Erro obtendo categorias.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }


}