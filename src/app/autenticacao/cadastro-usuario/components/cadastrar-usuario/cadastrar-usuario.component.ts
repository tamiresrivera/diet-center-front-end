import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { CadastroUsuario } from '../../models';
import { CpfValidator } from '../../../../shared/validators';
import { CadastrarUsuarioService } from '../../services';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.css']
})
export class CadastrarUsuarioComponent implements OnInit {

  form!: FormGroup;
  gUser!: string;
  gUserSplited!: any[];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private cadastrarUsuarioService: CadastrarUsuarioService
  ) { }

  ngOnInit(): void {
    this.gerarForm();
    this.gUser = this.route.snapshot.paramMap.get('gUser')!;
    console.log(this.gUser);
    if (this.gUser != null)
    {
      this.gUserSplited = this.gUser.split('&');
      this.form.get('email')!.setValue(this.gUserSplited[0]);
      this.form.get('nome')!.setValue(this.gUserSplited[1]);
    }
  }

  gerarForm(){
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      nomeUsuario: ['', [Validators.required, Validators.minLength(5)]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      cpf: ['', [Validators.required, CpfValidator]],
      telefone: ['', [Validators.required]],
      perfil: ['', [Validators.required]]
    });
  }

  cadastrarUsuario(){
    if (this.form.invalid){
      return;
    }
    const cadastroUsuario: CadastroUsuario = this.form.value;
    this.cadastrarUsuarioService.cadastrar(cadastroUsuario)
      .subscribe(
        data => {
          const msg: string = "Realize o login para acessar o sistema.";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.router.navigate(['/login']);
        },
        err => {
          let msg: string = "Tente novamente em instantes.";
          if (err.status == 400) {
            msg = err.error.errors.join(' ');
          }
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
    return false;
  }

}
