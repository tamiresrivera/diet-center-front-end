import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';

import { HttpUtilService } from '../../shared/services/http-util.service';

@Injectable()
export class AvaliacaoAntropometricaDiametroService {

  private readonly PATH: string = 'avaliacao-diametro';
  private readonly PATH_DIAMETROS = '/avaliacao/{avaliacaoId}';

  constructor(
    private http: HttpClient,
  	private httpUtil: HttpUtilService
  ) { }

  listarDiametros(avaliacaoId: string): Observable<any> {
    return this.http.get(
        env.baseApiUrl + this.PATH + 
          this.PATH_DIAMETROS.replace(
            '{avaliacaoId}', avaliacaoId),
        this.httpUtil.headers()
    );
  }
}
