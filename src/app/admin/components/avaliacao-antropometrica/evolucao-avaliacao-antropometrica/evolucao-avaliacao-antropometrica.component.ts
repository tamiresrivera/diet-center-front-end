import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ActivatedRoute } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { AvaliacaoAntropometricaService } from '../../../../admin/services/avaliacao-antropometrica.service';
import { AvaliacaoAntropometrica } from '../../../../admin/models/avaliacao-antropometrica.model';

import * as moment from 'moment';

@Component({
  selector: 'app-evolucao-avaliacao-antropometrica',
  templateUrl: './evolucao-avaliacao-antropometrica.component.html',
  styleUrls: ['./evolucao-avaliacao-antropometrica.component.css']
})
export class EvolucaoAvaliacaoAntropometricaComponent implements OnInit {

  pacienteId!: string;
  dadosDatas!: string[];
  dadosImc!: number[];
  dadosPeso!: number[];
  dadosPercGord!: number[];
  dadosMasGord!: number[];
  dadosMasMag!: number[];

  constructor(
    private avaliacaoAntropometricaService: AvaliacaoAntropometricaService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.pacienteId = this.route.snapshot.paramMap.get('pacienteId')!;
    this.buscarAvaliacoes();
  }

  public lineChartData: ChartDataSets[] = [];

  public lineChartLabels!: Label[];

  public lineChartColors: Color[] = [
    {
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line' as const;
  public lineChartPlugins = [];

  buscarAvaliacoes(){
    this.avaliacaoAntropometricaService.listarUltimasAvaliacoesPaciente(this.pacienteId)
      .subscribe(
        data => {
          const avaliacoes = data['data'] as AvaliacaoAntropometrica[];
          this.dadosDatas = avaliacoes.map( function( elem ) {
            return moment(elem.dataHora).format('DD-MM-YYYY');
          }); 
          this.dadosImc = avaliacoes.map( function( elem ) {
            return parseFloat(elem.imc);
          }); 
          this.dadosPeso = avaliacoes.map( function( elem ) {
            return parseFloat(elem.peso);
          });
          this.dadosPercGord = avaliacoes.map( function( elem ) {
            return parseFloat(elem.percentualMassaGorda);
          });
          this.dadosMasGord = avaliacoes.map( function( elem ) {
            return parseFloat(elem.massaGorda);
          });
          this.dadosMasMag = avaliacoes.map( function( elem ) {
            return parseFloat(elem.massaMagra);
          });

          this.lineChartLabels = this.dadosDatas;

          this.lineChartData = [
            { data: this.dadosImc, label: 'IMC' },
            { data: this.dadosPeso, label: 'Peso (Kg)' },
            { data: this.dadosPercGord, label: '% Gordura' },
            { data: this.dadosMasGord, label: 'Massa gorda (Kg)' },
            { data: this.dadosMasMag, label: 'Massa magra (Kg)' }
          ];
          
        },
        err => {
          const msg: string = "Erro obtendo avaliações.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }

}