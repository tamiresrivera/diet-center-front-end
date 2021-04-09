import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';

import { Agenda } from '../models';
import { HttpUtilService } from '../../shared/services/http-util.service';


@Injectable()
export class AgendaService {

  private readonly PATH: string = 'agenda/';
  private readonly PATH_AGENDA = 'profissional/{profissionalId}';
  private readonly PATH_AGENDA_TODOS = 'profissional/{profissionalId}/todos';
  private readonly PATH_AGENDA_DESMARCAR = 'desmarcar'
  private readonly PATH_AGENDA_USUARIO = 'usuario/{usuarioId}/proxima'
  private readonly PATH_AGENDA_DISPONIVEL = 'profissional/{profissionalId}/disponivel';
  private readonly PATH_AGENDA_AGENDAR = 'usuario/{usuarioId}';

  constructor(
    private http: HttpClient,
    private httpUtil: HttpUtilService
  ) { }

  listarAgendaPorProfissional(
    profissionalId: string,
    pagina: number,
    ordem: string,
    direcao: string): Observable<any> {

      const url: string = env.baseApiUrl + this.PATH +
          this.PATH_AGENDA.replace('{profissionalId}', profissionalId);

      const params: string = '?pag=' + pagina +
          '&ord=' + ordem + '&dir=' + direcao;

      return this.http.get(url + params, this.httpUtil.headers());
  }

  listarAgendaPorProfissionalTodos(): Observable<any> {
    return this.http.get(
        env.baseApiUrl + this.PATH + 
          this.PATH_AGENDA_TODOS.replace(
            '{profissionalId}', this.httpUtil.obterIdUsuario()),
        this.httpUtil.headers()
    );
  }

  listarAgendaPorProfissionalDisponivel(profissionalId: string): Observable<any> {
    return this.http.get(
        env.baseApiUrl + this.PATH + 
          this.PATH_AGENDA_DISPONIVEL.replace(
            '{profissionalId}', profissionalId),
        this.httpUtil.headers()
    );
  }  

  remover(agendaId: string): Observable<any> {
    return this.http.delete(
        env.baseApiUrl + this.PATH + agendaId,
        this.httpUtil.headers()
    );
  }

  desmarcar(agendaId: string): Observable<any> {
    return this.http.get(
        env.baseApiUrl +  this.PATH + this.PATH_AGENDA_DESMARCAR + '/' + agendaId,
        this.httpUtil.headers()
    );
  }

  cadastrar(agenda: Agenda): Observable<any> {
  	return this.http.post(
  	  	env.baseApiUrl + this.PATH, 
  	  	agenda,
  	  	this.httpUtil.headers()
  	);
  }

  buscarPorId(agendaId: string): Observable<any> {
    return this.http.get(
      env.baseApiUrl + this.PATH + agendaId,
      this.httpUtil.headers()
    );
  }

  buscarUltimaPorUsuarioId(): Observable<any> {
    return this.http.get(
      env.baseApiUrl + this.PATH + 
            this.PATH_AGENDA_USUARIO.replace(
              '{usuarioId}', this.httpUtil.obterIdUsuario()),
          this.httpUtil.headers()
    );
  }

  atualizar(agenda: Agenda): Observable<any> {
    return this.http.put(
      env.baseApiUrl + this.PATH + agenda.id,
      agenda,
      this.httpUtil.headers()
    )
  }

  agendar(agenda: Agenda): Observable<any> {
    return this.http.put(
      env.baseApiUrl + this.PATH + this.PATH_AGENDA_AGENDAR.replace('{usuarioId}', this.httpUtil.obterIdUsuario()),
      agenda,
      this.httpUtil.headers()
    )
  }

}
