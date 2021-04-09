import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';

import { Plano } from '../models';
import { HttpUtilService } from './http-util.service';

@Injectable({
  providedIn: 'root'
})
export class PlanoService {

  private readonly PATH: string = 'plano-alimentar';
  private readonly PATH_PLANOS = 'paciente/{pacienteId}';
  private readonly PATH_PLANOS_USUARIO = 'usuario/{usuarioId}';
  private readonly PATH_TODOS_PLANOS = 'paciente/{pacienteId}/todos';

  constructor(
    private http: HttpClient,
    private httpUtil: HttpUtilService
  ) { }

  cadastrar(plano: Plano): Observable<any> {
    //plano.profissionalId = this.httpUtil.obterIdUsuario();
    return this.http.post(
      env.baseApiUrl + this.PATH,
      plano,
      this.httpUtil.headers()
    );
  }

  remover(planoAlimentarId: string): Observable<any> {
    return this.http.delete(
        env.baseApiUrl + this.PATH + "/" + planoAlimentarId,
        this.httpUtil.headers()
    );
  }

  listarPlanoPorPacienteId(pacienteId: string): Observable<any> {
    return this.http.get(
        env.baseApiUrl + this.PATH + "/" +
          this.PATH_PLANOS.replace(
            '{pacienteId}', pacienteId),
        this.httpUtil.headers()
    );
  }

  listarPlanoPorUsuarioId(usuarioId: string): Observable<any> {
    return this.http.get(
        env.baseApiUrl + this.PATH + "/" +
          this.PATH_PLANOS_USUARIO.replace(
            '{usuarioId}', usuarioId),
        this.httpUtil.headers()
    );
  }

  buscarPorId(planoId: string): Observable<any> {
    return this.http.get(
      env.baseApiUrl + this.PATH + "/" + planoId,
      this.httpUtil.headers()
    );
  }

  atualizar(plano: Plano): Observable<any> {
    return this.http.put(
      env.baseApiUrl + this.PATH + "/" + plano.id,
      plano,
      this.httpUtil.headers()
    )
  }

}
