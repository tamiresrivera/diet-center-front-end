import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ProfissionalService } from '../../../services/profissional.service';
import { Profissional } from '../../../../admin/models/profissional.model';
@Component({
  selector: 'app-meu-profissional',
  templateUrl: './meu-profissional.component.html',
  styleUrls: ['./meu-profissional.component.css']
})
export class MeuProfissionalComponent implements OnInit {

  form!: FormGroup;
  profissional!: Profissional;
  nome!: string;
  endereco!: string;


  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private profissionalService: ProfissionalService
  ) { }

  ngOnInit(): void {
    this.gerarForm();
    this.obterDadosCadastro();
  }

  gerarForm(){
    this.form = this.fb.group({
      descricao: [''],
      crn: [''],
      telefone: [''],
      email: [''],
      midiaSocial: [''],
      endereco: [''],
      cep: ['']
    });
  }  

  obterDadosCadastro() {

    this.profissionalService.obterDadosProfissionalPorPaciente()
      .subscribe(
      dados => {
        const data = dados.data.data;
        this.nome = dados.data.nome;
        this.endereco = dados.data.endereco + ', ' + dados.data.numero + ', ' + dados.data.complemento + ' - ' +
                        dados.data.cidade + ' - ' + dados.data.estado;
        this.form.get('descricao')!.setValue(dados.data.descricao);
        this.form.get('crn')!.setValue(dados.data.crn);
        this.form.get('telefone')!.setValue(dados.data.telefone);
        this.form.get('email')!.setValue(dados.data.email);
        this.form.get('midiaSocial')!.setValue(dados.data.midiaSocial);
        this.form.get('endereco')!.setValue(this.endereco);
        this.form.get('cep')!.setValue(dados.data.cep);
      },
      err => {
        const msg: string = "Erro obtendo dados profissional.";
        this.snackBar.open(msg, "Erro", { duration: 5000 });
      }
    )
  }

}
