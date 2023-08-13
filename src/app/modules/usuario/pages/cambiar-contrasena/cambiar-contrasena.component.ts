import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.css']
})
export class CambiarContrasenaComponent {


  constructor( private dialogRef: MatDialogRef<CambiarContrasenaComponent>) {}

  cambiar = new FormGroup({
    contraseña: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(8)]),
    ncontraseña: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(8)]),
    vcontraseña: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(8)]),
  });


  cancelar() {
    this.dialogRef.close();
  }



  arePasswordsEqual(): boolean {
    const password = this.cambiar.value.ncontraseña;
    const confirm = this.cambiar.value.vcontraseña;
  
    // Se validan los valores de password y confirm antes de compararlos
    if (password === null || confirm === null) {
      return true; // Si uno de los campos es null, los campos no son iguales
    } else if (password != confirm) {
  
      return true; // Si los campos no son iguales, no son iguales
    }
    return false;

  }
  

}
