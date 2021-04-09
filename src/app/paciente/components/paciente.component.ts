import { Component } from '@angular/core';

@Component({
    template: `
    <div style="height: 80vh;">
        <mat-toolbar color="light">
            <mat-toolbar-row>
            <button mat-icon-button (click)="sidenav.toggle()" fxShow="true" fxHide.gt-sm>
                <mat-icon>menu</mat-icon>
            </button>
            <span>Painel do Paciente</span>
            <span class="menu-spacer"></span>
            <div fxShow="true" fxHide.lt-md>
                <!-- The following menu items will be hidden on both SM and XS screen sizes -->
                <a routerLink="/paciente/profissional" mat-button>Profissionais</a>
                <a routerLink="/paciente/cadastro" mat-button>Minhas informações</a>
                <a routerLink="/paciente/meu-profissional" mat-button>Meu profissional</a>
                <a routerLink="/paciente/plano-alimentar" mat-button>Plano Alimentar</a>
                <a routerLink="/paciente/receita" mat-button>Receitas</a>
                <a routerLink="/paciente/avaliacao-antropometrica" mat-button>Avaliações</a>
            </div>
            </mat-toolbar-row>
        </mat-toolbar>

        <mat-sidenav-container fxFlexFill>
            <mat-sidenav #sidenav>
            <mat-nav-list>
                <a (click)="sidenav.toggle()" mat-list-item><mat-icon matTooltip="Fechar">close</mat-icon></a>
                <a (click)="sidenav.toggle()" routerLink="/paciente/profissional" mat-list-item>Profissionais</a>
                <a (click)="sidenav.toggle()" routerLink="/paciente/cadastro" mat-list-item>Minhas informações</a>
                <a (click)="sidenav.toggle()" routerLink="/paciente/meu-profissional" mat-list-item>Meu profissional</a>
                <a (click)="sidenav.toggle()" routerLink="/paciente/plano-alimentar" mat-list-item>Plano alimentar</a>
                <a (click)="sidenav.toggle()" routerLink="/paciente/receita" mat-list-item>Receitas</a>
                <a (click)="sidenav.toggle()" routerLink="/paciente/avaliacao-antropometrica" mat-list-item>Avaliações</a>
            </mat-nav-list>
            </mat-sidenav>
            <mat-sidenav-content fxFlexFill><router-outlet></router-outlet></mat-sidenav-content>
        </mat-sidenav-container>
    </div> 
    `
})
export class PacienteComponent {
}