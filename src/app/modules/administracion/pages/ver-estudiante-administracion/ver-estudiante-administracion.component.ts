import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Estudiante } from '../../models/estudianteModel';
import { MateriaEstudiante } from '../../models/materiaEstudianteModel';
import { EstudianteAdministracionService } from '../../services/estudiante-administracion.service';
import { ActCEstudianteAdministracionComponent } from '../act-c-estudiante-administracion/act-c-estudiante-administracion.component';
import { ActNcEstudianteAdministracionComponent } from '../act-nc-estudiante-administracion/act-nc-estudiante-administracion.component';

export interface PeriodicElement {
  id: number;
  materia: string;
  paralelo: number;
}

@Component({
  selector: 'app-ver-estudiante-administracion',
  templateUrl: './ver-estudiante-administracion.component.html',
  styleUrls: ['./ver-estudiante-administracion.component.css']
})
export class VerEstudianteAdministracionComponent implements OnInit {
  datosEstudiantes: Estudiante[] = [];
  estudiante: Estudiante={
    id_estudiante: 0,
    cedula_estudiante: '',
    nombresCompletos_estudiante: '',
    ultimo_ciclo: '',
    medio_estudiante: 0
  };
  datosMateriasEstudiante: MateriaEstudiante[] = [];

  displayedColumns: string[] = [ 'materia', 'paralelo', 'actCumplidas', 'actNoCumplidas'];

  id: number=0;

  constructor(
    private dialog: MatDialog, 
    private route: ActivatedRoute,
    private router: Router,
    private estudianteService:EstudianteAdministracionService) {}

    ngOnInit(): void {

      this.id = Number(this.route.snapshot.queryParamMap.get('id_estudiante'));

      this.estudiante=history.state.data;
      this.estudianteService.obtenerMateriasEstudiantes(this.id).subscribe(data => {
        this.datosMateriasEstudiante=data.data

        this.estudianteService.obtenerEstudiantes().toPromise().then(respuesta =>{
          this.datosEstudiantes=respuesta.data;
          for(let i=0;i<this.datosEstudiantes.length;i++){
            if(this.datosEstudiantes[i].id_estudiante==this.id){
              this.estudiante=this.datosEstudiantes[i]
            }
          }          
        }).catch(err =>{
          console.error(err);
        });
      });
      
    }

  mostrarDialogoActC(id_curso: number) {
    this.dialog.open(ActCEstudianteAdministracionComponent, {
        data: { id_estudiante: this.id, id_curso: id_curso},
        width: '500px'
      });
    }
  
  mostrarDialogoActNC(id_curso: number) {
    this.dialog.open(ActNcEstudianteAdministracionComponent, {
      data: { id_estudiante: this.id, id_curso: id_curso},
      width: '500px'
    });
  }

  volver(){
    this.router.navigate(['/administracion/estudiante-administracion']);
  }
}