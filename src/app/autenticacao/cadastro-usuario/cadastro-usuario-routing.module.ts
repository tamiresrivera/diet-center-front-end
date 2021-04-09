import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    CadastroUsuarioComponent,
    CadastrarUsuarioComponent
} from './components';

export const CadastroUsuarioRoutes: Routes = [
    {
        path: 'cadastro-usuario',
        component: CadastroUsuarioComponent,
        children: [
            {
                path: ':gUser',
                component: CadastrarUsuarioComponent
            },
            {
                path: '',
                component: CadastrarUsuarioComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(CadastroUsuarioRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class CadastroUsuarioRoutingModule {
}