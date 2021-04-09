import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpUtilService } from './http-util.service';

@Injectable()
export class PacienteService {

  private readonly PATH: string = 'paciente';

  constructor(
    private http: HttpClient,
    private httpUtil: HttpUtilService
  ) { }

}
