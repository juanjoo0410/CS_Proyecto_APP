import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CursoModel } from '../../models/cursoModel';
import { DocentesService } from '../../services/docentes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  cursos!: CursoModel[];
  docente!: any;
  id = JSON.parse(localStorage.getItem("Usuario")!).id_usuario;
  usuarios: any;
  displayedColumns = ['id_curso,nombre_materia,modulo_materia,nombre_paralelo,docente_curso,dia_horario,hora_horario'];

  constructor(private _docentesService: DocentesService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this._docentesService.obtenerIdDocente(this.id).subscribe( docente => {
      this._docentesService.obtenerCursos(docente.data[0].id_docente).subscribe( data => {
        this.cursos = data.data;
      })  
    })
    



    
  }

  goCurso(indice: number){
    this.router.navigate([this.cursos[indice].nombre_materia.toString().toLowerCase().replaceAll(" ", "-")], {relativeTo: this.activatedRoute, state: {data:this.cursos[indice]}}); 
  }

}
