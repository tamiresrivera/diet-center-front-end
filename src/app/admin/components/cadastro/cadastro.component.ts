import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CadastroService } from '../../services/cadastro.service';
import { Profissional } from '../../models/profissional.model';

import { HttpUtilService } from '../../../shared/services';
import { CpfValidator } from 'src/app/shared';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  form!: FormGroup;
  usuarioId!: string;
  profissional!: Profissional;

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
      profissionalId: [''],
      descricao: ['', [Validators.required]],
      nome: ['', [Validators.required]],
      email: [, [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      cpf: ['', [Validators.required ,CpfValidator]],
      crn: ['', [Validators.required]],
      endereco: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      cep: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      complemento: [''],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      midiaSocial: [''],
      senha: ['']
    });
  }

  obterDadosCadastro() {
    this.usuarioId = this.httpUtil.obterIdUsuario();

    this.cadastroService.obterDadosCadastroProfissional(
      this.usuarioId).subscribe(
      dados => {
        const data = dados.data.data;
        this.form.get('profissionalId')!.setValue(dados.data.profissionalId);
        this.form.get('descricao')!.setValue(dados.data.descricao);
        this.form.get('nome')!.setValue(dados.data.nome);
        this.form.get('email')!.setValue(dados.data.email);
        this.form.get('telefone')!.setValue(dados.data.telefone);
        this.form.get('cpf')!.setValue(dados.data.cpf);
        this.form.get('crn')!.setValue(dados.data.crn);
        this.form.get('endereco')!.setValue(dados.data.endereco);
        this.form.get('numero')!.setValue(dados.data.numero);
        this.form.get('cep')!.setValue(("00000000" + dados.data.cep.toString()).slice(-8));
        this.form.get('descricao')!.setValue(dados.data.descricao);
        this.form.get('complemento')!.setValue(dados.data.complemento);
        this.form.get('cidade')!.setValue(dados.data.cidade);
        this.form.get('estado')!.setValue(dados.data.estado);
        this.form.get('midiaSocial')!.setValue(dados.data.midiaSocial);
      },
      err => {
        const msg: string = "Erro obtendo dados profissional.";
        this.snackBar.open(msg, "Erro", { duration: 5000 });
      }
    )
  }

  obterCadastro(dados: any): Profissional {
    
    return new Profissional(
      dados.profissionalId,
      this.usuarioId,
      dados.descricao,
      dados.nome,
      dados.email,
      dados.telefone,
      dados.cpf,
      dados.crn,
      dados.endereco,
      dados.numero,
      dados.cep,
      dados.complemento,
      dados.cidade,
      dados.estado,
      dados.midiaSocial,
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
          this.router.navigate(['/admin']);
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
