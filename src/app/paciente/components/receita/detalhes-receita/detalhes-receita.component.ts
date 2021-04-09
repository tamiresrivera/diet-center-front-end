import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { HttpUtilService } from '../../../../shared';
import { ReceitaService } from '../../../../admin/services/receita.service';

@Component({
  selector: 'app-detalhes-receita',
  templateUrl: './detalhes-receita.component.html',
  styleUrls: ['./detalhes-receita.component.css']
})
export class DetalhesReceitaComponent implements OnInit {

  form!: FormGroup;
  usuarioId!: string;
  receitaId!: string;

  constructor(
    private fb: FormBuilder,
    private httpUtil: HttpUtilService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private receitaService: ReceitaService
  ) { }

  ngOnInit(): void {
    this.receitaId = this.route.snapshot.paramMap.get('receitaId')!;
    this.gerarForm();
    this.obterDadosReceita();
  }

  gerarForm(){
    this.form = this.fb.group({
      titulo: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      descricao: ['', [Validators.required]]
    });
  }

  obterDadosReceita(){
    this.receitaService.buscarPorId(this.receitaId)
      .subscribe(
        dados => {
          const data = dados.data;
          this.form.get('titulo')!.setValue(dados.data.titulo);
          this.form.get('descricao')!.setValue(dados.data.descricao);
          this.form.get('categoria')!.setValue(dados.data.categoriaReceitaDescricao);
        },
        err => {
          let msg: string = "Erro obtendo categoria";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
          this.router.navigate(['/admin/receita']);
        }
      );
  }

}
