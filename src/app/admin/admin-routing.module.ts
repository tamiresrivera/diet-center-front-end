import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 

import {
    AdminComponent,
    CadastroComponent,
    ListagemComponent,
    AgendaComponent,
    ReceitaComponent,
    EditarReceitaComponent,
    AssociarAgendaComponent,
    PlanoAlimentarComponent,
    EditarPlanoAlimentarComponent,
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
    InformacaoPacienteComponent,
    AvaliacaoAntropometricaComponent,
    AdicionarAvaliacaoAntropometricaComponent,
    DetalhesAvaliacaoAntropometricaComponent,
    EvolucaoAvaliacaoAntropometricaComponent
} from './components';

export const AdminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            {
                path: '',
                component: ListagemComponent
            },
            {
                path: 'cadastro',
                component: CadastroComponent
            },
            {
                path: 'listagem',
                component: ListagemComponent
            },
            {
                path: 'agenda',
                component: AgendaComponent
            },
            {
                path: 'receita',
                component: ReceitaComponent
            },
            {
                path: 'editar-receita/:receitaId',
                component: EditarReceitaComponent
            },
            {
                path: 'associar-agenda/:agendaId',
                component: AssociarAgendaComponent
            },
            {
                path: 'categoria-receita',
                component: CategoriaReceitaComponent
            },
            {
                path: 'editar-categoria-receita/:categoriaId',
                component: EditarCategoriaReceitaComponent
            },
            {
                path: 'plano-alimentar/:pacienteId',
                component: PlanoAlimentarComponent
            },
            {
                path: 'editar-plano-alimentar/:planoId',
                component: EditarPlanoAlimentarComponent
            },
            {
                path: 'categoria-plano-alimentar',
                component: CategoriaPlanoAlimentarComponent
            },
            {
                path: 'editar-categoria-plano-alimentar/:categoriaId',
                component: EditarCategoriaPlanoAlimentarComponent
            },
            {
                path: 'categoria-avaliacao-prega',
                component: CategoriaAvaliacaoPregaComponent
            },
            {
                path: 'editar-categoria-avaliacao-prega/:categoriaId',
                component: EditarCategoriaAvaliacaoPregaComponent
            },
            {
                path: 'categoria-avaliacao-circunferencia',
                component: CategoriaAvaliacaoCircunferenciaComponent
            },
            {
                path: 'editar-categoria-avaliacao-circunferencia/:categoriaId',
                component: EditarCategoriaAvaliacaoCircunferenciaComponent
            },
            {
                path: 'categoria-avaliacao-diametro-osseo',
                component: CategoriaAvaliacaoDiametroOsseoComponent
            },
            {
                path: 'editar-categoria-avaliacao-diametro-osseo/:categoriaId',
                component: EditarCategoriaAvaliacaoDiametroOsseoComponent
            },
            {
                path: 'informacao-paciente/:pacienteId',
                component: InformacaoPacienteComponent
            },
            {
                path: 'avaliacao-antropometrica/:pacienteId',
                component: AvaliacaoAntropometricaComponent
            },
            {
                path: 'adicionar-avaliacao-antropometrica/:pacienteId',
                component: AdicionarAvaliacaoAntropometricaComponent
            },
            {
                path: 'detalhes-avaliacao-antropometrica/:avaliacaoId',
                component: DetalhesAvaliacaoAntropometricaComponent
            },
            {
                path: 'evolucao-avaliacao-antropometrica/:pacienteId',
                component: EvolucaoAvaliacaoAntropometricaComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(AdminRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule{
}