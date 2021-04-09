import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSelect } from '@angular/material/select';

import { ListagemService } from '../../services/listagem.service';
import { Paciente } from '../../../shared/models/paciente.model';
import { CategoriaReceitaService } from '../../services/categoria-receita.service';
import { CategoriaReceita } from '../../models/categoria-receita.model';

import { HttpUtilService } from '../../../shared/services';

@Component({
  selector: 'app-informacao-paciente',
  templateUrl: './informacao-paciente.component.html',
  styleUrls: ['./informacao-paciente.component.css']
})
export class InformacaoPacienteComponent implements OnInit {

  form!: FormGroup;
  pacienteId!: string;
  paciente!: Paciente;
  categoriaId!: string;

  categorias!: CategoriaReceita[];
  @ViewChild(MatSelect, { static: true }) matSelect!: MatSelect;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private httpUtil: HttpUtilService,
    private categoriaReceitaService: CategoriaReceitaService,
    private listagemService: ListagemService
  ) { }

  ngOnInit(): void {
    this.pacienteId = this.route.snapshot.paramMap.get('pacienteId')!;
    this.gerarForm();
    this.obterDadosCadastro();
    this.obterCategorias();
  }
  
  gerarForm(){
    this.form = this.fb.group({
      nome:  [''],
      email: [''],
      cpf: [''],
      telefone: [''],
      observacao: [''],
      cats: ['']
    });
  }

  obterDadosCadastro() {

    this.listagemService.obterDadosCadastroPaciente(
      this.pacienteId).subscribe(
      dados => {
        const data = dados.data.data;
        this.form.get('nome')!.setValue(dados.data.nome);
        this.form.get('email')!.setValue(dados.data.email);
        this.form.get('telefone')!.setValue(dados.data.telefone);
        this.form.get('cpf')!.setValue(dados.data.cpf);
        this.form.get('observacao')!.setValue(dados.data.observacao);
        this.form.get('cats')!.setValue(dados.data.categoriaReceitaId);
      },
      err => {
        const msg: string = "Erro obtendo dados paciente.";
        this.snackBar.open(msg, "Erro", { duration: 5000 });
      }
    )
  }

  obterCadastro(dados: any): Paciente {
    console.log(this.pacienteId);
    return new Paciente(
      dados.nome,
      dados.email,
      dados.cpf,
      dados.telefone,
      dados.observacao,
      dados.cats,
      '',
      this.pacienteId
      );
  }

  atualizar() {
  	if (this.form.invalid) return;

    const dados = this.form.value;
    this.listagemService.atualizar(this.obterCadastro(dados))
      .subscribe(
        data => {
          const msg: string = "Dados de paciente atualizados com sucesso!";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.router.navigate(['/admin/listagem']);
        },
        err => {
          let msg: string = "Tente novamente em instantes.";
          if (err.status == 400) {
            msg = err.error.errors.join(' ');
          }
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }

  obterCategorias(){
    this.categoriaReceitaService.listarCategorias()
      .subscribe(
        data => {
          const usuarioId: string = this.httpUtil.obterIdUsuario();
          this.categorias = (data.data as CategoriaReceita[]);
        },
        err => {
          const msg: string = "Erro obtendo categorias.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }


}
