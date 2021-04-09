import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from "@angular/material/sidenav";

import { ChartsModule } from 'ng2-charts';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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

import { ListagemComponent,
         CadastroComponent,
         AdminComponent,
         AgendaComponent,
         ConfirmarDialog,
         ConfirmarDesmarcarDialog,
         ConfirmarCategoriaReceitaDialog,
         ConfirmarPlanoAlimentarDialog,
         ConfirmarCategoriaPlanoAlimentarDialog,
         ConfirmarCategoriaAvaliacaoCircunferenciaDialog,
         ConfirmarCategoriaAvaliacaoDiametroOsseoDialog,
         ConfirmarReceitaDialog,
         ConfirmarAvaliacaoAntropometricaDialog
      } from './components';

import { ListagemService } from '../admin/services/listagem.service';
import { CadastroService } from '../admin/services/cadastro.service';
import { CategoriaReceitaService } from '../admin/services/categoria-receita.service';
import { CategoriaPlanoAlimentarService } from '../admin/services/categoria-plano-alimentar.service';
import { CategoriaAvaliacaoPregaService } from '../admin/services/categoria-avaliacao-prega.service';
import { CategoriaAvaliacaoCircunferenciaService } from '../admin/services/categoria-avaliacao-circunferencia.service';
import { CategoriaAvaliacaoDiametroOsseoService } from '../admin/services/categoria-avaliacao-diametro-osseo.service';
import { ReceitaService } from '../admin/services/receita.service';
import { AvaliacaoAntropometricaService } from '../admin/services/avaliacao-antropometrica.service';
import { AvaliacaoAntropometricaCircunferenciaService } from '../admin/services/avaliacao-antropometrica-circunferencia.service';
import { AvaliacaoAntropometricaPregaService } from '../admin/services/avaliacao-antropometrica-prega.service';
import { AvaliacaoAntropometricaDiametroService } from '../admin/services/avaliacao-antropometrica-diametro.service';

import { ExcelService } from '../shared/services/excel.service';

import {
  HttpUtilService,
  PlanoService,
  PacienteService
} from '../shared';

import { PtBrMatPaginatorIntl } from '../shared/pt-br-mat-paginator-intl';
import { AgendaService } from '../shared/services/agenda.service';
import { AssociarAgendaComponent } from './components/associar-agenda/associar-agenda.component';
import { CategoriaReceitaComponent } from './components/receita/categoria-receita/categoria-receita.component';
import { EditarCategoriaReceitaComponent } from './components/receita/editar-categoria-receita/editar-categoria-receita.component';
import { CategoriaPlanoAlimentarComponent } from './components/plano-alimentar/categoria-plano-alimentar/categoria-plano-alimentar.component';
import { EditarCategoriaPlanoAlimentarComponent } from './components/plano-alimentar/editar-categoria-plano-alimentar/editar-categoria-plano-alimentar.component';
import { CategoriaAvaliacaoPregaComponent, ConfirmarCategoriaAvaliacaoPregaDialog } from './components/avaliacao-antropometrica/categoria-avaliacao-prega/categoria-avaliacao-prega.component';
import { EditarCategoriaAvaliacaoPregaComponent } from './components/avaliacao-antropometrica/editar-categoria-avaliacao-prega/editar-categoria-avaliacao-prega.component';
import { CategoriaAvaliacaoCircunferenciaComponent } from './components/avaliacao-antropometrica/categoria-avaliacao-circunferencia/categoria-avaliacao-circunferencia.component';
import { EditarCategoriaAvaliacaoCircunferenciaComponent } from './components/avaliacao-antropometrica/editar-categoria-avaliacao-circunferencia/editar-categoria-avaliacao-circunferencia.component';
import { CategoriaAvaliacaoDiametroOsseoComponent } from './components/avaliacao-antropometrica/categoria-avaliacao-diametro-osseo/categoria-avaliacao-diametro-osseo.component';
import { EditarCategoriaAvaliacaoDiametroOsseoComponent } from './components/avaliacao-antropometrica/editar-categoria-avaliacao-diametro-osseo/editar-categoria-avaliacao-diametro-osseo.component';
import { ReceitaComponent } from './components/receita/receita/receita.component';
import { EditarReceitaComponent } from './components/receita/editar-receita/editar-receita.component';
import { PlanoAlimentarComponent } from './components/plano-alimentar/plano-alimentar/plano-alimentar.component';
import { EditarPlanoAlimentarComponent } from './components/plano-alimentar/editar-plano-alimentar/editar-plano-alimentar.component';
import { InformacaoPacienteComponent } from './components/informacao-paciente/informacao-paciente.component';
import { AvaliacaoAntropometricaComponent } from './components/avaliacao-antropometrica/avaliacao-antropometrica/avaliacao-antropometrica.component';
import { AdicionarAvaliacaoAntropometricaComponent } from './components/avaliacao-antropometrica/adicionar-avaliacao-antropometrica/adicionar-avaliacao-antropometrica.component';
import { EstatisticaComponent } from './components/estatistica/estatistica.component';
import { DetalhesAvaliacaoAntropometricaComponent } from './components/avaliacao-antropometrica/detalhes-avaliacao-antropometrica/detalhes-avaliacao-antropometrica.component';
import { EvolucaoAvaliacaoAntropometricaComponent } from './components/avaliacao-antropometrica/evolucao-avaliacao-antropometrica/evolucao-avaliacao-antropometrica.component';

@NgModule({
  declarations: [
    ListagemComponent,
    CadastroComponent,
    AdminComponent,
    AgendaComponent,
    ConfirmarDialog,
    ConfirmarDesmarcarDialog,
    ConfirmarCategoriaReceitaDialog,
    ConfirmarPlanoAlimentarDialog,
    ConfirmarCategoriaPlanoAlimentarDialog,
    ConfirmarCategoriaAvaliacaoPregaDialog,
    ConfirmarCategoriaAvaliacaoCircunferenciaDialog,
    ConfirmarCategoriaAvaliacaoDiametroOsseoDialog,
    ConfirmarReceitaDialog,
    ConfirmarAvaliacaoAntropometricaDialog,
    AssociarAgendaComponent,
    CategoriaReceitaComponent,
    EditarCategoriaReceitaComponent,
    CategoriaPlanoAlimentarComponent,
    EditarCategoriaPlanoAlimentarComponent,
    CategoriaAvaliacaoPregaComponent,
    EditarCategoriaAvaliacaoPregaComponent,
    CategoriaAvaliacaoCircunferenciaComponent,
    EditarCategoriaAvaliacaoCircunferenciaComponent,
    CategoriaAvaliacaoDiametroOsseoComponent,
    EditarCategoriaAvaliacaoDiametroOsseoComponent,
    ReceitaComponent,
    EditarReceitaComponent,
    PlanoAlimentarComponent,
    EditarPlanoAlimentarComponent,
    InformacaoPacienteComponent,
    AvaliacaoAntropometricaComponent,
    AdicionarAvaliacaoAntropometricaComponent,
    EstatisticaComponent,
    DetalhesAvaliacaoAntropometricaComponent,
    EvolucaoAvaliacaoAntropometricaComponent
  ],
  imports: [
    ChartsModule,
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    BrowserModule,
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
    PlanoService,
    ListagemService,
    MatPaginatorIntl,
    CadastroService,
    AgendaService,
    PacienteService,
    CategoriaReceitaService,
    CategoriaPlanoAlimentarService,
    CategoriaAvaliacaoPregaService,
    CategoriaAvaliacaoCircunferenciaService,
    CategoriaAvaliacaoDiametroOsseoService,
    ReceitaService,
    ExcelService,
    AvaliacaoAntropometricaService,
    AvaliacaoAntropometricaCircunferenciaService,
    AvaliacaoAntropometricaPregaService,
    AvaliacaoAntropometricaDiametroService,
    
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MatPaginatorIntl, useClass: PtBrMatPaginatorIntl }
  ],
  entryComponents: [ 
    ConfirmarDialog,
    ConfirmarDesmarcarDialog,
    ConfirmarCategoriaReceitaDialog,
    ConfirmarPlanoAlimentarDialog,
    ConfirmarCategoriaPlanoAlimentarDialog,
    ConfirmarCategoriaAvaliacaoPregaDialog,
    ConfirmarCategoriaAvaliacaoCircunferenciaDialog,
    ConfirmarCategoriaAvaliacaoDiametroOsseoDialog,
    ConfirmarReceitaDialog,
    ConfirmarAvaliacaoAntropometricaDialog
  ]
})
export class AdminModule { }
