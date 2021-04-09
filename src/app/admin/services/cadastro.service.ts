import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';

import { HttpUtilService } from '../../shared/services/http-util.service';

import { Profissional } from '../models/profissional.model';

@Injectable()
export class CadastroService {

  private readonly PATH: string = 'profissional/';
  private readonly PATH_PROFISSIONAL = '{usuarioId}';

  constructor(
    private http: HttpClient,
    private httpUtil: HttpUtilService
  ) { }

  obterInformacoesProfissional(): Observable<any> {
      return this.http.get(
        env.baseApiUrl + this.PATH +
            this.PATH_PROFISSIONAL.replace(
                '{usuarioId}', this.httpUtil.obterIdUsuario()),
            this.httpUtil.headers()
      );
  }

  obterDadosCadastroProfissional(
      usuarioId: string): Observable<any> {

        const url: string = env.baseApiUrl + this.PATH +
            this.PATH_PROFISSIONAL.replace('{usuarioId}', usuarioId);

        return this.http.get(url, this.httpUtil.headers());
  }

  atualizar(profissional: Profissional): Observable<any> {
    return this.http.patch(
        env.baseApiUrl + this.PATH + profissional.usuarioId, 
        profissional,
        this.httpUtil.headers()
    );
  }

}
