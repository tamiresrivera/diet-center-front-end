import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';

import { HttpUtilService } from '../../shared/services/http-util.service';

import { Paciente } from '../../shared/models/paciente.model';

@Injectable()
export class CadastroService {

  private readonly PATH: string = 'paciente/';
  private readonly PATH_PACIENTE_USUARIO = 'usuario/{usuarioId}';

  constructor(
    private http: HttpClient,
    private httpUtil: HttpUtilService
  ) { }

  obterCadastroPaciente(): Observable<any> {
      return this.http.get(
        env.baseApiUrl + this.PATH +
            this.PATH_PACIENTE_USUARIO.replace(
                '{usuarioId}', this.httpUtil.obterIdUsuario()),
            this.httpUtil.headers()
      );
  }

  atualizar(paciente: Paciente): Observable<any> {
    return this.http.patch(
        env.baseApiUrl + this.PATH + paciente.id, 
        paciente,
        this.httpUtil.headers()
    );
  }

}
