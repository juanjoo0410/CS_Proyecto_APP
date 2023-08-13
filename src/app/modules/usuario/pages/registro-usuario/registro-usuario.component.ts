import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AutenticacionModule } from 'src/app/core/components/autentificacion/autenticacion.module';
import { AuthService } from 'src/app/core/services/auth.service';
import { map, Observable } from 'rxjs';
import { RegistrarDocenteComponent } from '../registrar-docente/registrar-docente.component';
import { RegistrarEstudianteComponent } from '../registrar-estudiante/registrar-estudiante.component';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})

export class RegistroUsuarioComponent implements OnInit {
  @ViewChild(RegistrarDocenteComponent) RegistrarDocente!: RegistrarDocenteComponent;
  @ViewChild(RegistrarEstudianteComponent) RegistraEstudiante!: RegistrarEstudianteComponent;
  @ViewChild('stepper') stepper!: MatStepper;


  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  estudianteForm!: FormGroup;
  isEditable = false;
  rol = 0;


  constructor(private _formBuilder: FormBuilder, private router: Router, private snackBar: MatSnackBar, private _autenticacionModule: AuthService) { }

  ngOnInit(): void {

    this.firstFormGroup = new FormGroup({
      usuario: new FormControl('', [Validators.required]),
      contrasena: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(8)]),
      conf: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(8)]),
    });

    this.secondFormGroup = this._formBuilder.group({
      ROLES: ['', Validators.required],
    });

  }

  submitUno() {    
    this.stepper.next();
  }

  validarUsuario() {
    this.router.navigate(['/home']);
  }



  volver() {
    this.router.navigate(['/home']);
  }

  arePasswordsEqual(): boolean {
    const password = this.firstFormGroup.value.contrasena;
    const confirm = this.firstFormGroup.value.conf;

    if (password === null || confirm === null) {
      return true; // Si uno de los campos es null, los campos no son iguales
    } else if (password != confirm) {
      return true; // Si los campos no son iguales, no son iguales
    }

    return false;
  }

  verificarUsuario(control: FormControl): Promise<any> | Observable<any> {
    if (!control.value) {
      return Promise.resolve(null);
    }

    return new Promise((resolve, reject) => {
      this._autenticacionModule.verificarUsuario(control.value).subscribe(
        (data) => {
          if (data.data.existe == true) {
            control.setErrors({ 'usuarioExiste': true });
          } else {
            control.setErrors(null);
          }
        }
      );
    });
  }


}




