import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';

import { HttpUtilService } from '../../shared/services/http-util.service';
@Injectable()
export class AvaliacaoAntropometricaPregaService {

  private readonly PATH: string = 'avaliacao-prega';
  private readonly PATH_PREGAS = '/avaliacao/{avaliacaoId}';

  constructor(
    private http: HttpClient,
  	private httpUtil: HttpUtilService
  ) { }

  listarPregas(avaliacaoId: string): Observable<any> {
    return this.http.get(
        env.baseApiUrl + this.PATH + 
          this.PATH_PREGAS.replace(
            '{avaliacaoId}', avaliacaoId),
        this.httpUtil.headers()
    );
  }
}
