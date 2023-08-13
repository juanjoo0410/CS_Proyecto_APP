import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosUser } from 'src/app/core/interfaces/datosSimplesUser.interface';
import { Docente } from '../../models/docenteModel';
import { MateriaDocente } from '../../models/materiaDocenteModel';
import { DocenteAdministracionService } from '../../services/docente-administracion.service';


@Component({
  selector: 'app-ver-docente-administracion',
  templateUrl: './ver-docente-administracion.component.html',
  styleUrls: ['./ver-docente-administracion.component.css']
})
export class VerDocenteAdministracionComponent implements OnInit {
  datosDocentes: Docente[] = [];
  docente: Docente={
    id_docente: 0,
    cedula_docente: '',
    nombresCompletos_docente: '',
    ciclo_contrato: '',
    estado_docente: '',
    tipo_contrato: ''
  };

  active = false;
  usuario: DatosUser = {
    id_usuario: 0,
    nombre_usuario: '',
    contrasena_usuario: '',
    rol_usuario: 0
  };
  nombre = '';
  
  datosMateriasDocente: MateriaDocente[] = [];

  displayedColumns: string[] = [ 'materia', 'paralelo', 'evaluo', 'calificacion'];

  id: number=0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private docenteService:DocenteAdministracionService) {}

  ngOnInit(): void {

    this.usuario = JSON.parse(localStorage.getItem('Usuario') || '{}');

    if (localStorage.getItem('Usuario') != undefined) {
      this.active = true;
    } else {
      this.active = false;
    }
    
    this.id = Number(this.route.snapshot.queryParamMap.get('id_docente'));

    this.docente=history.state.data;
    this.docenteService.obtenerEvaluacionesDocentes(this.id).subscribe(data => {
      this.datosMateriasDocente=data.data
      this.docenteService.obtenerDocentes().toPromise().then(respuesta =>{
        this.datosDocentes=respuesta.data;
        for(let i=0;i<this.datosDocentes.length;i++){
          if(this.datosDocentes[i].id_docente==this.id){
            this.docente=this.datosDocentes[i]
          }
        }        
      }).catch(err =>{
        console.error(err);
      });
    });
  }

  volver(){
    this.router.navigate(['/administracion/docente-administracion']);
  }
}
