import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Login } from '../../models';
import { LoginService } from '../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  guser!: any;

  constructor(private fb: FormBuilder, 
              private snackBar: MatSnackBar,
              private router: Router,
              private loginService: LoginService
              ) {  }

  ngOnInit(): void {
    this.gerarForm();
  }

  gerarForm() {
    this.form = this.fb.group({
      nomeUsuario: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  logar() {
    if( this.form.invalid ){
      return;
    }
    const login: Login = this.form.value;
    this.loginService.logar(login)
      .subscribe(
        (data: any) => {
          localStorage['token'] = data['data']['token'];
          const usuarioData = JSON.parse(
            atob(data['data']['token'].split('.')[1]));
            if (usuarioData['role'] == 'ROLE_ADMIN') {
              //alert('deve direcionar para a pagina de admin');
              this.router.navigate(['/admin']);
            } else {
              //alert('deve direcionar para a página de paciente');
              this.router.navigate(['/paciente']);
            }
        },
        (err: any) => {
          let msg: string = "Tente novamente em instantes.";
          if (err['status'] == 401) {
            msg = "Usuário/Senha inválido(s).";
          }
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }

}
