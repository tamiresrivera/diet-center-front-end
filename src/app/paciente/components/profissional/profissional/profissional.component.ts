import { Component, OnInit, ViewChild  } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import 'rxjs/add/observable/of';

import { ProfissionalService } from '../../../services/profissional.service';

import { HttpUtilService } from '../../../../shared/services';
import { Profissional } from '../../../../admin/models';


@Component({
  selector: 'app-profissional',
  templateUrl: './profissional.component.html',
  styleUrls: ['./profissional.component.css']
})
export class ProfissionalComponent implements OnInit {

  dados!: any[];
  dataSource!: MatTableDataSource<Profissional>;
  colunas: string[] = ['nome', 'telefone', 'cep', 'cidade', 'estado', 'acao'];

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private profissionalService: ProfissionalService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.exibirProfissionais();
  }

  exibirProfissionais(){
    this.profissionalService.listarTodosProfissionais().subscribe(
      data => {
        const profissionais = data['data'] as Profissional[];
        this.dados = profissionais;
        this.dataSource = new MatTableDataSource<Profissional>(profissionais);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },  
      err => {
        const msg: string = "Erro obtendo profissionais.";
        this.snackBar.open(msg, "Erro", { duration: 5000 });
      }
    )
  }

}
