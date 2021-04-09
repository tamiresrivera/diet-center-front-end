import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';

import { HttpUtilService } from '../../shared/services/http-util.service';

@Injectable()
export class AvaliacaoAntropometricaCircunferenciaService {

  private readonly PATH: string = 'avaliacao-circunferencia';
  private readonly PATH_CIRCUNFERENCIAS = '/avaliacao/{avaliacaoId}';

  constructor(
    private http: HttpClient,
  	private httpUtil: HttpUtilService
  ) { }

  listarCircunferencias(avaliacaoId: string): Observable<any> {
    return this.http.get(
        env.baseApiUrl + this.PATH + 
          this.PATH_CIRCUNFERENCIAS.replace(
            '{avaliacaoId}', avaliacaoId),
        this.httpUtil.headers()
    );
  }

}
