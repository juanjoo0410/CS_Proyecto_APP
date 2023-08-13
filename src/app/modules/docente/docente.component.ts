import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css']
})
export class DocenteComponent {

  constructor(private router:Router) { }

  registroUsuario() {
    this.router.navigate(['usuario/registro-usuario']);
  }

}
