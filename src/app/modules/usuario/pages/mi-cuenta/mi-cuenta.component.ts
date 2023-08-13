import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CambiarContrasenaComponent } from '../cambiar-contrasena/cambiar-contrasena.component';
import { EperfilComponent } from 'src/app/modules/estudiante/pages/eperfil/eperfil.component';
import { DatosUser } from 'src/app/core/interfaces/datosSimplesUser.interface';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})

export class MiCuentaComponent {
  active = false;
  usuario: DatosUser = {
    id_usuario: 0,
    nombre_usuario: '',
    contrasena_usuario: '',
    rol_usuario: 0
  };
  nombre = '';
  
  constructor(private dialog: MatDialog) { }

  cambiar(){
    this.dialog.open(CambiarContrasenaComponent ,{ disableClose: true, width: '400px', height: '500px'});
  }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('Usuario') || '{}');

    if (localStorage.getItem('Usuario') != undefined) {
      this.active = true;
    } else {
      this.active = false;
    }
  }
}