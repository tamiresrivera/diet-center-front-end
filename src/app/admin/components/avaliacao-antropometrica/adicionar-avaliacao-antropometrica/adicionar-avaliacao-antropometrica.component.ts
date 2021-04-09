import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatSelect } from '@angular/material/select';
import { HttpUtilService } from '../../../../shared/services';
import 'rxjs/add/observable/of';

import { AvaliacaoAntropometricaService } from '../../../services/avaliacao-antropometrica.service';
import { AvaliacaoAntropometrica } from '../../../models/avaliacao-antropometrica.model';
import { CategoriaAvaliacaoCircunferencia } from '../../../models/categoria-avaliacao-circunferencia.model';
import { CategoriaAvaliacaoCircunferenciaService } from '../../../services/categoria-avaliacao-circunferencia.service';
import { CategoriaAvaliacaoPrega } from '../../../models/categoria-avaliacao-prega.model';
import { CategoriaAvaliacaoPregaService } from '../../../services/categoria-avaliacao-prega.service';
import { CategoriaAvaliacaoDiametroOsseo } from '../../../models/categoria-avaliacao-diametro-osseo.model';
import { CategoriaAvaliacaoDiametroOsseoService } from '../../../services/categoria-avaliacao-diametro-osseo.service';

@Component({
  selector: 'app-adicionar-avaliacao-antropometrica',
  templateUrl: './adicionar-avaliacao-antropometrica.component.html',
  styleUrls: ['./adicionar-avaliacao-antropometrica.component.css']
})
export class AdicionarAvaliacaoAntropometricaComponent implements OnInit {

  dados!: any[];
  pacienteId!: string;
  form!: FormGroup;

  categoriasCircunferencias!: CategoriaAvaliacaoCircunferencia[];
  categoriasPregas!: CategoriaAvaliacaoPrega[];
  categoriasDiametros!: CategoriaAvaliacaoDiametroOsseo[];
  @ViewChild(MatSelect, { static: true }) matSelect!: MatSelect;

  constructor(
    private avaliacaoAntropometricaService: AvaliacaoAntropometricaService,
    private categoriaAvaliacaoCircunferenciaService: CategoriaAvaliacaoCircunferenciaService,
    private categoriaAvaliacaoPregaService: CategoriaAvaliacaoPregaService,
    private categoriaAvaliacaoDiametroOsseoService: CategoriaAvaliacaoDiametroOsseoService,
    private httpUtil: HttpUtilService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.pacienteId = this.route.snapshot.paramMap.get('pacienteId')!;
    this.obterCategoriasCircunferencias();
    this.obterCategoriasPregas();
    this.obterCategoriasDiametros();
    this.gerarForm();
  }

  gerarForm(){
    this.form = this.fb.group({
      dataHora: ['', [Validators.required]],
      altura: ['', [Validators.required, Validators.pattern('[0-9](\.[0-9][0-9])')]],
      peso: ['', [Validators.required, Validators.pattern('[0-9]+(\.[0-9])'), Validators.maxLength(5) ]],
      imc: ['', [Validators.required, Validators.pattern('[0-9]+(\.[0-9][0-9])'), Validators.maxLength(5) ]],
      percentualMassaGorda: ['', [Validators.required, Validators.pattern('[0-9]+(\.[0-9])'), Validators.maxLength(4) ]],
      percentualMassaMagra: ['', [Validators.required, Validators.pattern('[0-9]+(\.[0-9])'), Validators.maxLength(4) ]],
      massaGorda: ['', [Validators.required, Validators.pattern('[0-9]+(\.[0-9])'), Validators.maxLength(5) ]],
      massaMagra: ['', [Validators.required, Validators.pattern('[0-9]+(\.[0-9])'), Validators.maxLength(5) ]],
      pesoOsseo: ['', [Validators.pattern('[0-9]+(\.[0-9][0-9])'), Validators.maxLength(5)]],
      pesoResidual: ['', [Validators.pattern('[0-9]+(\.[0-9][0-9])'), Validators.maxLength(6)]],
      pesoMuscular: ['', [Validators.pattern('[0-9]+(\.[0-9][0-9])'), Validators.maxLength(6)]],
      areaMuscularBraco: ['', [Validators.pattern('[0-9]+(\.[0-9][0-9])'), Validators.maxLength(5)]],
      areaGorduraBraco: ['', [Validators.pattern('[0-9]+(\.[0-9][0-9])'), Validators.maxLength(5)]],
      circunferencias: this.fb.array([]),
      diametros: this.fb.array([]),
      pregas: this.fb.array([])
 
    })
  }

  get circunferencias() : FormArray {
    return this.form.get("circunferencias") as FormArray
  }

  get diametros() : FormArray {
    return this.form.get("diametros") as FormArray
  }

  get pregas() : FormArray {
    return this.form.get("pregas") as FormArray
  }

  newCircunferencia(): FormGroup {
    return this.fb.group({
      categoriaAvaliacaoCircunferenciaId: ['', [Validators.required]],
      valor: ['', [Validators.required, Validators.pattern('[0-9]+(\.[0-9])'), Validators.maxLength(5)]]
    })
  }

  newDiametro(): FormGroup {
    return this.fb.group({
      categoriaAvaliacaoDiametroOsseoId: ['', [Validators.required]],
      valor: ['', [Validators.required, Validators.pattern('[0-9]+(\.[0-9])'), Validators.maxLength(5)]]
    })
  }

  newPrega(): FormGroup {
    return this.fb.group({
      categoriaAvaliacaoPregaId: ['', [Validators.required]],
      valor: ['', [Validators.required, Validators.pattern('[0-9]+(\.[0-9])'), Validators.maxLength(5)]]
    })
  }

  addCircunferencias() {
    this.circunferencias.push(this.newCircunferencia());
  }

  addDiametros() {
    this.diametros.push(this.newDiametro());
  }

  addPregas() {
    this.pregas.push(this.newPrega());
  }

  removeCircunferencia(i:number) {
    this.circunferencias.removeAt(i);
  }

  removeDiametro(i:number) {
    this.diametros.removeAt(i);
  }

  removePrega(i:number) {
    this.pregas.removeAt(i);
  }

  obterAvaliacao(dados: any): AvaliacaoAntropometrica {

    return new AvaliacaoAntropometrica(
      this.pacienteId,
      dados.dataHora,
      dados.altura,
      dados.peso,
      dados.imc,
      dados.percentualMassaGorda,
      dados.percentualMassaMagra,
      dados.massaGorda,
      dados.massaMagra,
      dados.pesoOsseo,
      dados.pesoResidual,
      dados.pesoMuscular,
      dados.areaMuscularBraco,
      dados.areaGorduraBraco,
      dados.circunferencias,
      dados.pregas,
      dados.diametros
    );
  }

  cadastrar(){
    if (this.form.invalid) return;

    const dados = this.form.value;

    this.avaliacaoAntropometricaService.cadastrar(this.obterAvaliacao(dados))
      .subscribe(
        data => {
          const msg: string = "Avaliação cadastrada com sucesso!";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.router.navigate([['/admin/avaliacao-antropometrica/'] + this.pacienteId]);
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

  obterCategoriasCircunferencias(){
    this.categoriaAvaliacaoCircunferenciaService.listarCategorias()
      .subscribe(
        data => {
          const usuarioId: string = this.httpUtil.obterIdUsuario();
          this.categoriasCircunferencias = (data.data as CategoriaAvaliacaoCircunferencia[]);
        },
        err => {
          const msg: string = "Erro obtendo categorias.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }

  obterCategoriasDiametros(){
    this.categoriaAvaliacaoDiametroOsseoService.listarCategorias()
      .subscribe(
        data => {
          const usuarioId: string = this.httpUtil.obterIdUsuario();
          this.categoriasDiametros = (data.data as CategoriaAvaliacaoDiametroOsseo[]);
        },
        err => {
          const msg: string = "Erro obtendo categorias.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }  

  obterCategoriasPregas(){
    this.categoriaAvaliacaoPregaService.listarCategorias()
      .subscribe(
        data => {
          const usuarioId: string = this.httpUtil.obterIdUsuario();
          this.categoriasPregas = (data.data as CategoriaAvaliacaoPrega[]);
        },
        err => {
          const msg: string = "Erro obtendo categorias.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }

}
