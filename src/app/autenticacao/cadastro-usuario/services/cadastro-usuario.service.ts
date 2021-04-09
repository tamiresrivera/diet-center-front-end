import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../../environments/environment';

import { CadastroUsuario } from '../';

@Injectable()
export class CadastrarUsuarioService {

  private readonly PATH: string = 'cadastrar-usuario';

  constructor(private http: HttpClient) { }

  cadastrar(CadastroUsuario: CadastroUsuario): Observable<any> {
    return this.http.post(env.baseApiUrl + this.PATH, CadastroUsuario);
  }
}
