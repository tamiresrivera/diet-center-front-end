import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CadastroService } from '../../services/cadastro.service';
import { Paciente } from '../../../shared/models/paciente.model';

import { HttpUtilService } from '../../../shared/services';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  form!: FormGroup;
  usuarioId!: string;
  paciente!: Paciente;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private httpUtil: HttpUtilService,
    private cadastroService: CadastroService
  ) { }

  ngOnInit(): void {
    this.gerarForm();
    this.obterDadosCadastro();
  }

  gerarForm(){
    this.form = this.fb.group({
      pacienteId: [''],
      nome: ['', [Validators.required]],
      email: [, [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      cpf: [''],
      senha: ['']
    });
  }

  obterDadosCadastro() {
    this.usuarioId = this.httpUtil.obterIdUsuario();

    this.cadastroService.obterCadastroPaciente()
      .subscribe(
      dados => {
        const data = dados.data.data;
        this.form.get('pacienteId')!.setValue(dados.data.id);
        this.form.get('nome')!.setValue(dados.data.nome);
        this.form.get('email')!.setValue(dados.data.email);
        this.form.get('telefone')!.setValue(dados.data.telefone);
        this.form.get('cpf')!.setValue(dados.data.cpf);
      },
      err => {
        const msg: string = "Erro obtendo dados paciente.";
        this.snackBar.open(msg, "Erro", { duration: 5000 });
      }
    )
  }

  obterCadastro(dados: any): Paciente {
    
    return new Paciente(
      dados.nome,
      dados.email,
      dados.cpf,
      dados.telefone,
      '',
      '',
      this.usuarioId,
      dados.pacienteId,
      dados.senha
      );
  }

  atualizarCadastro() {
  	if (this.form.invalid) return;

    const dados = this.form.value;
    this.cadastroService.atualizar(this.obterCadastro(dados))
      .subscribe(
        data => {
          const msg: string = "Cadastro atualizado com sucesso!";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.router.navigate(['/paciente']);
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


}
