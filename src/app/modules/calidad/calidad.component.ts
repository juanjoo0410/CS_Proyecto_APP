import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calidad',
  templateUrl: './calidad.component.html',
  styleUrls: ['./calidad.component.css']
})
export class CalidadComponent {

  constructor(private router: Router) { }

  irDimension() {
    this.router.navigate(['calidad/dimension']);
  }

  irNormasISO() {
    this.router.navigate(['calidad/normas-iso']);
  }

  irAseguramiento() {
    this.router.navigate(['calidad/aseguramiento']);
  }

  irGestion() {
    this.router.navigate(['calidad/gestion']);
  }

  irHerramientas() {
    this.router.navigate(['calidad/herramientas']);
  }

}
