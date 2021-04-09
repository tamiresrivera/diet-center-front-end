import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from "@angular/material/sidenav";
import { FlexLayoutModule } from "@angular/flex-layout";

import { ChartsModule } from 'ng2-charts';

import { SharedModule } from '../shared/shared.module'; 

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule  } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';

import { MatGridListModule } from '@angular/material/grid-list';
import { PtBrMatPaginatorIntl } from '../shared/pt-br-mat-paginator-intl';

import { PacienteComponent,
         ConfirmarAgendarDialog,
         ConfirmarDesmarcarDialog
       } from './components';
import { PrincipalComponent } from './components/principal/principal.component';
import { PlanoAlimentarComponent } from './components/plano-alimentar/plano-alimentar/plano-alimentar.component';
import { DetalhesPlanoAlimentarComponent } from './components/plano-alimentar/detalhes-plano-alimentar/detalhes-plano-alimentar.component';

import { CadastroService } from '../paciente/services/cadastro.service';
import { ProfissionalService } from '../paciente/services/profissional.service';

import {
  HttpUtilService
} from '../shared';
import { ReceitaComponent } from './components/receita/receita/receita.component';
import { DetalhesReceitaComponent } from './components/receita/detalhes-receita/detalhes-receita.component';
import { AvaliacaoAntropometricaComponent } from './components/avaliacao-antropometrica/avaliacao-antropometrica/avaliacao-antropometrica.component';
import { DetalhesAvaliacaoAntropometricaComponent } from './components/avaliacao-antropometrica/detalhes-avaliacao-antropometrica/detalhes-avaliacao-antropometrica.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { ProfissionalComponent } from './components/profissional/profissional/profissional.component';
import { DetalhesProfissionalComponent } from './components/profissional/detalhes-profissional/detalhes-profissional.component';
import { AgendaProfissionalComponent } from './components/profissional/agenda-profissional/agenda-profissional.component';
import { MeuProfissionalComponent } from './components/profissional/meu-profissional/meu-profissional.component';
import { EvolucaoAvaliacaoAntropometricaComponent } from './components/avaliacao-antropometrica/evolucao-avaliacao-antropometrica/evolucao-avaliacao-antropometrica.component';

@NgModule({
  declarations: [
    PacienteComponent,
    PrincipalComponent,
    PlanoAlimentarComponent,
    DetalhesPlanoAlimentarComponent,
    ReceitaComponent,
    DetalhesReceitaComponent,
    AvaliacaoAntropometricaComponent,
    DetalhesAvaliacaoAntropometricaComponent,
    CadastroComponent,
    ProfissionalComponent,
    DetalhesProfissionalComponent,
    AgendaProfissionalComponent,
    ConfirmarAgendarDialog,
    ConfirmarDesmarcarDialog,
    MeuProfissionalComponent,
    EvolucaoAvaliacaoAntropometricaComponent
  ],
  imports: [
    ChartsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatGridListModule,
    MatToolbarModule,
    MatMenuModule,
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    SharedModule,
    MatToolbarModule,
    MatExpansionModule,
    MatMenuModule
  ],
  providers: [
    HttpUtilService,
    CadastroService,
    ProfissionalService,
    MatPaginatorIntl,
    
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MatPaginatorIntl, useClass: PtBrMatPaginatorIntl }
  ],
  entryComponents: [ 
    ConfirmarAgendarDialog,
    ConfirmarDesmarcarDialog
  ]
})
export class PacienteModule { }
