import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';

import { AvaliacaoAntropometrica } from '../models';
import { HttpUtilService } from '../../shared/services/http-util.service';

@Injectable()
export class AvaliacaoAntropometricaService {

  private readonly PATH: string = 'avaliacao-antropometrica';
  private readonly PATH_AVALIACOES = '/paciente/{pacienteId}';
  private readonly PATH_AVALIACOES_USUARIO = '/usuario/{usuarioId}';
  private readonly PATH_AVALIACOES_USUARIO_ULTIMAS = '/usuario/{usuarioId}/ultimas';
  private readonly PATH_AVALIACOES_PACIENTE_ULTIMAS = '/paciente/{pacienteId}/ultimas';

  constructor(
  	private http: HttpClient,
  	private httpUtil: HttpUtilService) { }

  cadastrar(avaliacaoAntropometrica: AvaliacaoAntropometrica): Observable<any> {
  	return this.http.post(
  	  	env.baseApiUrl + this.PATH, 
  	  	avaliacaoAntropometrica,
  	  	this.httpUtil.headers()
  	);
  }

  listarAvaliacoes(pacienteId: string): Observable<any> {
    return this.http.get(
        env.baseApiUrl + this.PATH + 
          this.PATH_AVALIACOES.replace(
            '{pacienteId}', pacienteId),
        this.httpUtil.headers()
    );
  }

  remover(avaliacaoId: string): Observable<any> {
    return this.http.delete(
        env.baseApiUrl + this.PATH + '/' + avaliacaoId,
        this.httpUtil.headers()
    );
  }

  buscarPorId(avaliacaoId: string): Observable<any> {
    return this.http.get(
        env.baseApiUrl + this.PATH + '/' + avaliacaoId,
        this.httpUtil.headers()
    );
  }

  atualizar(avaliacaoAntropometrica: AvaliacaoAntropometrica): Observable<any> {
    return this.http.put(
        env.baseApiUrl + this.PATH + '/' + avaliacaoAntropometrica.id, 
        avaliacaoAntropometrica,
        this.httpUtil.headers()
    );
  }

  listarAvaliacoesUsuario(): Observable<any> {
    return this.http.get(
        env.baseApiUrl + this.PATH + 
          this.PATH_AVALIACOES_USUARIO.replace(
            '{usuarioId}', this.httpUtil.obterIdUsuario()),
        this.httpUtil.headers()
    );
  }

  listarUltimasAvaliacoesUsuario(): Observable<any> {
    return this.http.get(
        env.baseApiUrl + this.PATH + 
          this.PATH_AVALIACOES_USUARIO_ULTIMAS.replace(
            '{usuarioId}', this.httpUtil.obterIdUsuario()),
        this.httpUtil.headers()
    );
  }  

  listarUltimasAvaliacoesPaciente(pacienteId: string): Observable<any> {
    return this.http.get(
        env.baseApiUrl + this.PATH + 
          this.PATH_AVALIACOES_PACIENTE_ULTIMAS.replace(
            '{pacienteId}', pacienteId),
        this.httpUtil.headers()
    );
  }   

}










