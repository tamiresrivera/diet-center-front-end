import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';

import { CategoriaPlanoAlimentar } from '../models';
import { HttpUtilService } from '../../shared/services/http-util.service';

@Injectable()
export class CategoriaPlanoAlimentarService {

  private readonly PATH: string = 'categoria-plano-alimentar';
  private readonly PATH_CATEGORIAS = '/profissional/{profissionalId}';

  constructor(
  	private http: HttpClient,
  	private httpUtil: HttpUtilService) { }

  cadastrar(categoriaPlanoAlimentar: CategoriaPlanoAlimentar): Observable<any> {
  	return this.http.post(
  	  	env.baseApiUrl + this.PATH, 
  	  	categoriaPlanoAlimentar,
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

  atualizar(categoriaPlanoAlimentar: CategoriaPlanoAlimentar): Observable<any> {
    return this.http.put(
        env.baseApiUrl + this.PATH + '/' + categoriaPlanoAlimentar.id, 
        categoriaPlanoAlimentar,
        this.httpUtil.headers()
    );
  }

}










