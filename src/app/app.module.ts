import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule  } from '@angular/material/toolbar';
import { MatIconModule  } from '@angular/material/icon';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { LoginModule,
         LoginRoutingModule,
         CadastroUsuarioModule,
         CadastroUsuarioRoutingModule } from './autenticacao';
import { AppRoutingModule } from './app-routing.module';
import { AdminModule, AdminRoutingModule } from './admin';
import { PacienteModule, FuncionarioRoutingModule } from './paciente';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    LoginModule,
    LoginRoutingModule,
    CadastroUsuarioModule,
    CadastroUsuarioRoutingModule,
    AdminModule,
    AdminRoutingModule,
    PacienteModule,
    FuncionarioRoutingModule,

    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
