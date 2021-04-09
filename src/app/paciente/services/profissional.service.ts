import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';

import { HttpUtilService } from '../../shared/services/http-util.service';

@Injectable()
export class ProfissionalService {

  private readonly PATH: string = 'profissional/';
  private readonly PATH_PROFISSIONAL: string = 'profissional/{profissionalId}';
  private readonly PATH_PROFISSIONAL_PACIENTE: string = 'paciente/{pacienteId}';

  constructor(
    private http: HttpClient,
    private httpUtil: HttpUtilService
  ) { }

  obterDadosProfissional(profissionalId: string): Observable<any> {
    return this.http.get(
      env.baseApiUrl + this.PATH +
          this.PATH_PROFISSIONAL.replace(
              '{profissionalId}', profissionalId),
          this.httpUtil.headers()
    );
  }

  obterDadosProfissionalPorPaciente(): Observable<any> {
    return this.http.get(
      env.baseApiUrl + this.PATH +
          this.PATH_PROFISSIONAL_PACIENTE.replace(
              '{pacienteId}', this.httpUtil.obterIdUsuario()),
          this.httpUtil.headers()
    );
  }
 
  listarTodosProfissionais(): Observable<any> {
    return this.http.get(
      env.baseApiUrl + this.PATH,
          this.httpUtil.headers()
    );
  }
}
