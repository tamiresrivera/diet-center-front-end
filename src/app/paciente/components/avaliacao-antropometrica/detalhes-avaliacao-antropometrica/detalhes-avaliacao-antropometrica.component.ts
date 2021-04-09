import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelect } from '@angular/material/select';
import { HttpUtilService } from '../../../../shared/services';

import { AvaliacaoAntropometricaService } from '../../../../admin/services/avaliacao-antropometrica.service';
import { AvaliacaoAntropometricaCircunferencia } from '../../../../admin/models/avaliacao-antropometrica-circunferencia.model';
import { AvaliacaoAntropometricaPrega } from '../../../../admin/models/avaliacao-antropometrica-prega.model';
import { AvaliacaoAntropometricaDiametroOsseo } from '../../../../admin/models/avaliacao-antropometrica-diametro-osseo.model';
import { CategoriaAvaliacaoCircunferencia } from '../../../../admin/models/categoria-avaliacao-circunferencia.model';
import { CategoriaAvaliacaoPrega } from '../../../../admin/models/categoria-avaliacao-prega.model';
import { CategoriaAvaliacaoDiametroOsseo } from '../../../../admin/models/categoria-avaliacao-diametro-osseo.model';
import { AvaliacaoAntropometricaCircunferenciaService } from '../../../../admin/services/avaliacao-antropometrica-circunferencia.service';
import { AvaliacaoAntropometricaPregaService } from '../../../../admin/services/avaliacao-antropometrica-prega.service';
import { AvaliacaoAntropometricaDiametroService } from '../../../../admin/services/avaliacao-antropometrica-diametro.service';

import * as moment from 'moment';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-detalhes-avaliacao-antropometrica',
  templateUrl: './detalhes-avaliacao-antropometrica.component.html',
  styleUrls: ['./detalhes-avaliacao-antropometrica.component.css']
})
export class DetalhesAvaliacaoAntropometricaComponent implements OnInit {

  dataSourceCircunferencia!: MatTableDataSource<AvaliacaoAntropometricaCircunferencia>;
  dataSourcePrega!: MatTableDataSource<AvaliacaoAntropometricaPrega>;
  dataSourceDiametro!: MatTableDataSource<AvaliacaoAntropometricaDiametroOsseo>;
  dados!: any[];
  avaliacaoId!: string;
  pacienteId!: string;
  dataHora!: string;
  form!: FormGroup;
  colunas: string[] = ['categoria', 'valor'];

  categoriasCircunferencias!: CategoriaAvaliacaoCircunferencia[];
  categoriasPregas!: CategoriaAvaliacaoPrega[];
  categoriasDiametros!: CategoriaAvaliacaoDiametroOsseo[];
  @ViewChild(MatSelect, { static: true }) matSelect!: MatSelect;  

  constructor(
    private avaliacaoAntropometricaService: AvaliacaoAntropometricaService,
    private avaliacaoAntropometricaCircunferenciaService: AvaliacaoAntropometricaCircunferenciaService,
    private avaliacaoAntropometricaPregaService: AvaliacaoAntropometricaPregaService,
    private avaliacaoAntropometricaDiametroService: AvaliacaoAntropometricaDiametroService,
    private httpUtil: HttpUtilService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.avaliacaoId = this.route.snapshot.paramMap.get('avaliacaoId')!;
    this.gerarForm();
    this.obterAvaliacao();
    this.exibirCircunferencias();
    this.exibirPregas();
    this.exibirDiametros();
  }

  gerarForm(){
    this.form = this.fb.group({
      dataHora: [''],
      altura: [''],
      peso: [''],
      imc: [''],
      percentualMassaGorda: [''],
      percentualMassaMagra: [''],
      massaGorda: [''],
      massaMagra: [''],
      pesoOsseo: [''],
      pesoResidual: [''],
      pesoMuscular: [''],
      areaMuscularBraco: [''],
      areaGorduraBraco: [''],
      circunferencias: [''],
      diametros: [''],
      pregas: ['']
    })
  }

  obterAvaliacao(){
    this.avaliacaoAntropometricaService.buscarPorId(this.avaliacaoId)
      .subscribe(
        dados => {
          const data = dados.data;
          this.pacienteId = dados.data.pacienteId;

          const dt = dados.data.dataHora;
          this.dataHora = moment(dt).utc().format('DD/MM/YYYY').toString();

          console.log(this.dataHora);
          this.form.get('altura')!.setValue(dados.data.altura);
          this.form.get('peso')!.setValue(dados.data.peso);
          this.form.get('imc')!.setValue(dados.data.imc);
          this.form.get('percentualMassaGorda')!.setValue(dados.data.percentualMassaGorda);
          this.form.get('percentualMassaMagra')!.setValue(dados.data.percentualMassaMagra);
          this.form.get('massaGorda')!.setValue(dados.data.massaGorda);
          this.form.get('massaMagra')!.setValue(dados.data.massaMagra);
          this.form.get('pesoOsseo')!.setValue(dados.data.pesoOsseo);
          this.form.get('pesoResidual')!.setValue(dados.data.pesoResidual);
          this.form.get('pesoMuscular')!.setValue(dados.data.pesoMuscular);
          this.form.get('areaMuscularBraco')!.setValue(dados.data.areaMuscularBraco);
          this.form.get('areaGorduraBraco')!.setValue(dados.data.areaGorduraBraco);
        },
        err => {
          let msg: string = "Erro obtendo avaliação";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
          this.router.navigate(['/paciente/avaliacao-antropometrica']);
        }
      );
  }

  exibirCircunferencias(){
    this.avaliacaoAntropometricaCircunferenciaService.listarCircunferencias(this.avaliacaoId)
      .subscribe(
        data => {
          const circunferencias = data['data'] as AvaliacaoAntropometricaCircunferencia[];
          this.dados = circunferencias;
          this.dataSourceCircunferencia = new MatTableDataSource<AvaliacaoAntropometricaCircunferencia>(circunferencias);
        },
        err => {
          const msg: string = "Erro obtendo circunferencias.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }

  exibirPregas(){
    this.avaliacaoAntropometricaPregaService.listarPregas(this.avaliacaoId)
      .subscribe(
        data => {
          const pregas = data['data'] as AvaliacaoAntropometricaPrega[];
          this.dados = pregas;
          this.dataSourcePrega = new MatTableDataSource<AvaliacaoAntropometricaPrega>(pregas);
        },
        err => {
          const msg: string = "Erro obtendo pregas.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }

  exibirDiametros(){
    this.avaliacaoAntropometricaDiametroService.listarDiametros(this.avaliacaoId)
      .subscribe(
        data => {
          const diametros = data['data'] as AvaliacaoAntropometricaDiametroOsseo[];
          this.dados = diametros;
          this.dataSourceDiametro = new MatTableDataSource<AvaliacaoAntropometricaDiametroOsseo>(diametros);
        },
        err => {
          const msg: string = "Erro obtendo diâmetros ósseos.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }

}