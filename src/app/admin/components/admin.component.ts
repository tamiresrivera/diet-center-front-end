import { Component } from '@angular/core';

@Component({
    template: `
    <div style="height: 80vh;">
        <mat-toolbar color="light">
            <mat-toolbar-row>
            <button mat-icon-button (click)="sidenav.toggle()" fxShow="true" fxHide.gt-sm>
                <mat-icon>menu</mat-icon>
            </button>
            <span>Painel do Profissional</span>
            <span class="menu-spacer"></span>
            <div fxShow="true" fxHide.lt-md>
                <!-- The following menu items will be hidden on both SM and XS screen sizes -->
                <a routerLink="/admin/cadastro" mat-button>Minhas Informações</a>
                <a routerLink="/admin/agenda" mat-button>Minha agenda</a>
                <a routerLink="/admin/listagem" mat-button>Meus pacientes</a>
                <a routerLink="/admin/receita" mat-button>Receitas</a>
                <a [matMenuTriggerFor]="cadastroMenu" mat-button>Parâmetros</a>
                <mat-menu #cadastroMenu="matMenu">
                    <a routerLink="/admin/categoria-receita" mat-menu-item>Receitas</a>
                    <a routerLink="/admin/categoria-plano-alimentar" mat-menu-item>Plano Alimentar</a>
                    <a routerLink="/admin/categoria-avaliacao-prega" mat-menu-item>Avaliação - Pregas</a>
                    <a routerLink="/admin/categoria-avaliacao-circunferencia" mat-menu-item>Avaliação - Circunferências</a>
                    <a routerLink="/admin/categoria-avaliacao-diametro-osseo" mat-menu-item>Avaliação - Diâmetros</a>
                </mat-menu>
                
            </div>
            </mat-toolbar-row>
        </mat-toolbar>

        <mat-sidenav-container fxFlexFill>
            <mat-sidenav #sidenav>
            <mat-nav-list>
                <a (click)="sidenav.toggle()" mat-list-item><mat-icon matTooltip="Fechar">close</mat-icon></a>
                <a (click)="sidenav.toggle()" routerLink="/admin/cadastro" mat-list-item>Minhas informações</a>
                <a (click)="sidenav.toggle()" routerLink="/admin/agenda" mat-list-item>Minha agenda</a>
                <a (click)="sidenav.toggle()" routerLink="/admin/listagem" mat-list-item>Meus pacientes</a>
                <a (click)="sidenav.toggle()" routerLink="/admin/receita" mat-list-item>Receitas</a>
                <a [matMenuTriggerFor]="cadastroMenu" mat-button>Parâmetros</a>
                <mat-menu #cadastroMenu="matMenu">
                    <a (click)="sidenav.toggle()" routerLink="/admin/categoria-receita" mat-list-item>Receitas</a>
                    <a (click)="sidenav.toggle()" routerLink="/admin/categoria-plano-alimentar" mat-list-item>Plano Alimentar</a>
                    <a (click)="sidenav.toggle()" routerLink="/admin/categoria-avaliacao-prega" mat-list-item>Avaliação - Pregas</a>
                    <a (click)="sidenav.toggle()" routerLink="/admin/categoria-avaliacao-circunferencia" mat-list-item>Avaliação - Circunferências</a>
                    <a (click)="sidenav.toggle()" routerLink="/admin/categoria-avaliacao-diametro-osseo" mat-list-item>Avaliação - Diâmetros</a>
                </mat-menu>
                
            </mat-nav-list>
            </mat-sidenav>
            <mat-sidenav-content fxFlexFill><router-outlet></router-outlet></mat-sidenav-content>
        </mat-sidenav-container>
    </div> 
    `
})
export class AdminComponent {
}