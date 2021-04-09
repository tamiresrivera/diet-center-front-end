import { Component, OnInit, ViewChild  } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import 'rxjs/add/observable/of';

import { ListagemService } from '../../services';

import { HttpUtilService } from '../../../shared/services';
import { Paciente } from '../../../shared/models';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {

  dados!: any[];
  dataSource!: MatTableDataSource<Paciente>;
  colunas: string[] = ['nome', 'email', 'telefone', 'acao'];
  profissionalId!: string;
  totalPacientes!: number;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private listagemService: ListagemService,
    private httpUtil: HttpUtilService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.exibirPacientes();
  }

  exibirPacientes(){
    this.profissionalId = this.httpUtil.obterIdUsuario();

    this.listagemService.listarTodosPacientes().subscribe(
      data => {
        const listagem = data['data'] as Paciente[];
        this.dados = listagem;
        this.dataSource = new MatTableDataSource<Paciente>(listagem);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },  
      err => {
        const msg: string = "Erro obtendo pacientes.";
        this.snackBar.open(msg, "Erro", { duration: 5000 });
      }
    )
  }

}
