import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CursoModel } from '../../models/cursoModel';
import { CursosService } from './services/cursos.service';
import { ActivatedRoute } from '@angular/router';
import { EstudiantePerfil } from '../../models/estudianteperfil.model';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
})
export class CursosComponent implements OnInit {
  cursos!: CursoModel[];
  datosCompletos!: EstudiantePerfil[];

  id = JSON.parse(localStorage.getItem("Usuario")!).id_usuario;
  usuarios: any;
  displayedColumns = [
    'id_curso,nombre_materia,modulo_materia,nombre_paralelo,docente_curso,dia_horario,hora_horario',
  ];

  constructor(
    private cursosService: CursosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem("Usuario")!).id_usuario;
    this.cursosService.obtenerDatosEstudiante(this.id).subscribe((data) => {
      this.cursosService
        .obtenerCurso(data.data[0].id_estudiante)
        .subscribe((dato) => {
          this.cursos = dato.data;
        });
    });
  }

  goCurso(indice: number) {
    this.router.navigate([this.cursos[indice].nombre_materia], {
      relativeTo: this.activatedRoute,
      state: { data: this.cursos[indice] },
    });
  }
}
