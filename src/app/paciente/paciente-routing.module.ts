import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    PacienteComponent,
    PrincipalComponent,
    CadastroComponent
} from './components';

import {
    PlanoAlimentarComponent,
    DetalhesPlanoAlimentarComponent
} from './components/plano-alimentar';

import {
    AvaliacaoAntropometricaComponent,
    DetalhesAvaliacaoAntropometricaComponent,
    EvolucaoAvaliacaoAntropometricaComponent
} from './components/avaliacao-antropometrica';

import {
    ProfissionalComponent,
    DetalhesProfissionalComponent,
    AgendaProfissionalComponent,
    MeuProfissionalComponent,
} from './components/profissional';

import {
    ReceitaComponent,
    DetalhesReceitaComponent
} from './components/receita';

export const PacienteRoutes: Routes = [
    {
        path: 'paciente',
        component: PacienteComponent,
        children: [
            {
                path: '',
                component: PlanoAlimentarComponent
            },
            {
                path: 'plano-alimentar',
                component: PlanoAlimentarComponent
            },
            {
                path: 'detalhes-plano-alimentar/:planoId',
                component: DetalhesPlanoAlimentarComponent
            },
            {
                path: 'principal',
                component: PrincipalComponent
            },
            {
                path: 'receita',
                component: ReceitaComponent
            },
            {
                path: 'detalhes-receita/:receitaId',
                component: DetalhesReceitaComponent
            },
            {
                path: 'avaliacao-antropometrica',
                component: AvaliacaoAntropometricaComponent
            },
            {
                path: 'detalhes-avaliacao-antropometrica/:avaliacaoId',
                component: DetalhesAvaliacaoAntropometricaComponent
            },
            {
                path: 'evolucao-avaliacao-antropometrica',
                component: EvolucaoAvaliacaoAntropometricaComponent
            },
            {
                path: 'cadastro',
                component: CadastroComponent
            },
            {
                path: 'profissional',
                component: ProfissionalComponent
            },
            {
                path: 'detalhes-profissional/:profissionalId',
                component: DetalhesProfissionalComponent
            },
            {
                path: 'agenda-profissional/:profissionalId',
                component: AgendaProfissionalComponent
            },
            {
                path: 'meu-profissional',
                component: MeuProfissionalComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(PacienteRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class FuncionarioRoutingModule {
}