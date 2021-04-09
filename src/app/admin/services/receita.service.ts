import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';

import { Receita } from '../models';
import { HttpUtilService } from '../../shared/services/http-util.service';

@Injectable()
export class ReceitaService {

  private readonly PATH: string = 'receita';
  private readonly PATH_RECEITAS = '/profissional/{profissionalId}';
  private readonly PATH_RECEITAS_PACIENTE = '/paciente/{usuarioId}';

  constructor(
  	private http: HttpClient,
  	private httpUtil: HttpUtilService) { }

  cadastrar(receita: Receita): Observable<any> {
  	return this.http.post(
  	  	env.baseApiUrl + this.PATH, 
  	  	receita,
  	  	this.httpUtil.headers()
  	);
  }

  listarReceitas(): Observable<any> {
    return this.http.get(
        env.baseApiUrl + this.PATH + 
          this.PATH_RECEITAS.replace(
            '{profissionalId}', this.httpUtil.obterIdUsuario()),
        this.httpUtil.headers()
    );
  }

  listarReceitasPaciente(): Observable<any> {
    return this.http.get(
        env.baseApiUrl + this.PATH + 
          this.PATH_RECEITAS_PACIENTE.replace(
            '{usuarioId}', this.httpUtil.obterIdUsuario()),
        this.httpUtil.headers()
    );
  }

  remover(receitaId: string): Observable<any> {
    return this.http.delete(
        env.baseApiUrl + this.PATH + '/' + receitaId,
        this.httpUtil.headers()
    );
  }

  buscarPorId(receitaId: string): Observable<any> {
    return this.http.get(
        env.baseApiUrl + this.PATH + '/' + receitaId,
        this.httpUtil.headers()
    );
  }

  atualizar(receita: Receita): Observable<any> {
    return this.http.put(
        env.baseApiUrl + this.PATH + '/' + receita.id, 
        receita,
        this.httpUtil.headers()
    );
  }

}