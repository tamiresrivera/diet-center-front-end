import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';

import { Paciente } from '../../shared/models';
import { HttpUtilService } from '../../shared/services/http-util.service';

@Injectable()
export class ListagemService {

  private readonly PATH: string = 'paciente/';
  private readonly PATH_PACIENTES = 'profissional/{profissionalId}';
  private readonly PATH_TODOS_PACIENTES = 'profissional/{profissionalId}/todos';

  constructor(
    private http: HttpClient,
    private httpUtil: HttpUtilService
  ) { }

  listarTodosPacientes(): Observable<any> {
      return this.http.get(
        env.baseApiUrl + this.PATH +
            this.PATH_TODOS_PACIENTES.replace(
                '{profissionalId}', this.httpUtil.obterIdUsuario()),
            this.httpUtil.headers()
      );
  }

  listarPacientesPorProfissional(
      profissionalId: string,
      pagina: number,
      ordem: string,
      direcao: string): Observable<any> {

        const url: string = env.baseApiUrl + this.PATH +
            this.PATH_PACIENTES.replace('{profissionalId}', profissionalId);

        const params: string = '?pag=' + pagina +
            '&ord=' + ordem + '&dir=' + direcao;

        return this.http.get(url + params, this.httpUtil.headers());
    }

    obterDadosCadastroPaciente(
        pacienteId: string): Observable<any> {
  
          const url: string = env.baseApiUrl + this.PATH + pacienteId;
  
          return this.http.get(url, this.httpUtil.headers());
    }

    atualizar(paciente: Paciente): Observable<any> {
        return this.http.patch(
            env.baseApiUrl + this.PATH + paciente.id, 
            paciente,
            this.httpUtil.headers()
        );
      }
}
