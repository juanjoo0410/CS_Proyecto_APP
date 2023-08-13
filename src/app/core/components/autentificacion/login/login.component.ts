import { LocalizedString } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;  
  user = localStorage.getItem('Usuario') ? '' : '';
    
  constructor(private dialogRef: MatDialogRef<LoginComponent>, 
    private snackbar: MatSnackBar, 
    private loginService: LoginService, private dialog: MatDialog,  
    private autenticar: AuthService,
    private router: Router
    ) {
  }
  
  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.maxLength(100)]),
    contrasena: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)])
  });

  async onSubmit() {
    let txtemail = this.formLogin.value.email ?? '';
    let txtcontrasena = this.formLogin.value.contrasena ?? ''; 
    if (await this.loginService.login(txtemail, txtcontrasena)) {      
      this.dialogRef.close();
      if (await this.loginService.returnId() == 0 || !this.loginService.returnId()) window.open('/home', '_self');
      if (await this.loginService.returnId() == 1) window.open('/estudiante/horario', '_self');
      if (await this.loginService.returnId() == 2) window.open('/docente/horario', '_self');
      if (await this.loginService.returnId() == 3) window.open('/administracion', '_self');
    } else {      
      this.snackbar.open('Usuario o contraseña incorrecta.', 'OK', { duration: 5000 });
    }
  }  

  registroUsuario(){
    this.dialogRef.close();  
    this.router.navigate(['usuario/registro-usuario']);
  }

  cancelar() {
    this.dialogRef.close();
  }
}
