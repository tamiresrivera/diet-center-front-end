import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';

import { CategoriaAvaliacaoCircunferencia } from '../models';
import { HttpUtilService } from '../../shared/services/http-util.service';

@Injectable()
export class CategoriaAvaliacaoCircunferenciaService {

  private readonly PATH: string = 'categoria-avaliacao-circunferencia';
  private readonly PATH_CATEGORIAS = '/profissional/{profissionalId}';

  constructor(
  	private http: HttpClient,
  	private httpUtil: HttpUtilService) { }

  cadastrar(categoriaAvaliacaoCircunferencia: CategoriaAvaliacaoCircunferencia): Observable<any> {
  	return this.http.post(
  	  	env.baseApiUrl + this.PATH, 
  	  	categoriaAvaliacaoCircunferencia,
  	  	this.httpUtil.headers()
  	);
  }

  listarCategorias(): Observable<any> {
    return this.http.get(
        env.baseApiUrl + this.PATH + 
          this.PATH_CATEGORIAS.replace(
            '{profissionalId}', this.httpUtil.obterIdUsuario()),
        this.httpUtil.headers()
    );
  }

  remover(categoriaId: string): Observable<any> {
    return this.http.delete(
        env.baseApiUrl + this.PATH + '/' + categoriaId,
        this.httpUtil.headers()
    );
  }

  buscarPorId(categoriaId: string): Observable<any> {
    return this.http.get(
        env.baseApiUrl + this.PATH + '/' + categoriaId,
        this.httpUtil.headers()
    );
  }

  atualizar(categoriaAvaliacaoCircunferencia: CategoriaAvaliacaoCircunferencia): Observable<any> {
    return this.http.put(
        env.baseApiUrl + this.PATH + '/' + categoriaAvaliacaoCircunferencia.id, 
        categoriaAvaliacaoCircunferencia,
        this.httpUtil.headers()
    );
  }

}










