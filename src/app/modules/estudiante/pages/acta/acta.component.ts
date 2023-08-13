import { Component, OnInit } from '@angular/core';
import { ActaCalificacion } from '../../models/actacalificacion.model';
import { ActaService } from './services/acta.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-acta',
  templateUrl: './acta.component.html',
  styleUrls: ['./acta.component.css']
})
export class ActaComponent implements OnInit {
  dataSource!: ActaCalificacion[];
  id = JSON.parse(localStorage.getItem("Usuario")!).id_usuario;
  displayedColumns = ['materia', 'modulo', 'paralelo', 'pcalificaciones', 'pasistencias', 'estado'];

  constructor( 
    private actaservice: ActaService,
    private autentificar: AuthService
    ) {}

  ngOnInit() {
    let id_estudiante: number = 0;
    this.autentificar.obtenerDatosCompletos(this.id).subscribe(resp => {      
      id_estudiante = resp.data[0].id_estudiante;
      this.actaservice.obtenerEstudianteItemActa(id_estudiante).subscribe(data=>{
        this.dataSource = data.data;
        console.log(this.dataSource);
      });
    });
  }
}