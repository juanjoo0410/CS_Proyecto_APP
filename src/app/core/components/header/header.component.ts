import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DatosUser } from '../../interfaces/datosSimplesUser.interface';
import { AuthService } from '../../services/auth.service';
import { LoginService } from '../../services/login.service';
import { LoginComponent } from '../autentificacion/login/login.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  active = false;
  usuario: DatosUser = {
    id_usuario: 0,
    nombre_usuario: '',
    contrasena_usuario: '',
    rol_usuario: 0
  };
  nombre = '';
  estudianteMatriculado = Boolean(localStorage.getItem("alumno"));

  constructor(private dialog: MatDialog,
    private loginService: LoginService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('Usuario') || '{}');
    if (localStorage.getItem('Usuario') != undefined) {
      this.active = true;
    } else {
      this.active = false;
    }
  }

  openDialogSesion(): void {
    this.dialog.open(LoginComponent, { disableClose: true, width: '350px' });
  }

  logout() {
    this.loginService.logout();
  }

  //Docente
  irDocente() {
    this.router.navigate(['/docente']);
  }
  irDocenteHorario() {
    this.router.navigate(['/docente/horario']);
  }
  irDocenteCursos() {
    this.router.navigate(['/docente/cursos']);
  }
  irDocenteActa() {
    this.router.navigate(['/docente/acta-calificaciones']);
  }

  //Alumnos
  irEstudiante() {
    this.router.navigate(['/estudiante']);
  }
  irEstudianteHorario() {
    this.router.navigate(['/estudiante/horario']);
  }
  irEstudianteCursos() {
    this.router.navigate(['/estudiante/cursos']);
  }
  irEstudianteActa() {
    this.router.navigate(['/estudiante/acta-calificaciones']);
  }
  irEstudianteEvaluacionDocente() {
    this.router.navigate(['/estudiante/evaluacion-docente']);
  }

  irEstudianteMatriculacion() {
    this.router.navigate(['/estudiante/matriculacion']);
  }

  //Administracion
  irAdmin() {
    this.router.navigate(['/administracion']);
  }
  irAdminEstudiante() {
    this.router.navigate(['/administracion/estudiante-administracion']);
  }
  irAdminDocente() {
    this.router.navigate(['/administracion/docente-administracion']);
  }

  //Usuario
  irUsuario() {
    this.router.navigate(['/usuario']);
  }
  irUsuarioCuenta() {
    this.router.navigate(['/usuario/mi-cuenta']);
  }

  //calidad
  irCalidad() {
    this.router.navigate(['/calidad']);
  }
  irCalidadDimension() {
    this.router.navigate(['/calidad/dimension']);
  }
  irCalidadNormas() {
    this.router.navigate(['/calidad/normas-iso']);
  }
  irCalidadGestion() {
    this.router.navigate(['/calidad/gestion']);
  }
  irCalidadAseguramiento() {
    this.router.navigate(['/calidad/aseguramiento']);
  }
  irCalidadherramientas() {
    this.router.navigate(['/calidad/herramientas']);
  }
}

