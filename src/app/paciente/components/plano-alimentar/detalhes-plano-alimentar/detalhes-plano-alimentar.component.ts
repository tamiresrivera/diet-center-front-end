import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelect } from '@angular/material/select';

import { HttpUtilService } from '../../../../shared';
import { PlanoService } from '../../../../shared/services';

@Component({
  selector: 'app-detalhes-plano-alimentar',
  templateUrl: './detalhes-plano-alimentar.component.html',
  styleUrls: ['./detalhes-plano-alimentar.component.css']
})
export class DetalhesPlanoAlimentarComponent implements OnInit {

  form!: FormGroup;
  horario!: string[]
  profissionalId!: string;
  pacienteId!: string;
  usuarioPacienteId!: string;
  categoriaId!: string;
  planoId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private planoService: PlanoService
  ) { }

  ngOnInit(): void {
    this.planoId = this.route.snapshot.paramMap.get('planoId')!;
    this.obterDadosPlano();
    this.gerarForm();
  }

  gerarForm(){
    this.form = this.fb.group({
      categoria: [''],
      descricao: [''],
      observacao: ['']
    });
  }

  obterDadosPlano(){
    this.planoService.buscarPorId(this.planoId)
      .subscribe(
        dados => {
          const data = dados.data;
          this.horario = dados.data.hora;
          this.pacienteId = dados.data.pacienteId;
          this.usuarioPacienteId = dados.data.usuarioPacienteId;  
          this.form.get('descricao')!.setValue(dados.data.descricao);
          this.form.get('observacao')!.setValue(dados.data.observacao);
          this.form.get('categoria')!.setValue(dados.data.descricaoCategoria);
        },
        err => {
          let msg: string = "Erro obtendo plano";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
          this.router.navigate(['/paciente/plano-alimentar']);
        }
      );
  }

}
