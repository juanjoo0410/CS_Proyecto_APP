import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Actividad } from '../../models/actividadModel';
import { EstudianteAdministracionService } from '../../services/estudiante-administracion.service';

export interface PeriodicElement {
  id: number;
  actividad: string;
}

@Component({
  selector: 'app-act-nc-estudiante-administracion',
  templateUrl: './act-nc-estudiante-administracion.component.html',
  styleUrls: ['./act-nc-estudiante-administracion.component.css']
})
export class ActNcEstudianteAdministracionComponent implements OnInit {
  datosActividades: Actividad[] = [];

  displayedColumns: string[] = [ 'actividad'];
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id_estudiante: number, id_curso: number },
    private dialogRef: MatDialogRef<ActNcEstudianteAdministracionComponent>,
    private estudianteService:EstudianteAdministracionService) {}

  ngOnInit(): void {
    this.estudianteService.obtenerEntregasEstudiantes('No enviada', this.data.id_estudiante, this.data.id_curso ).subscribe(data => {
      this.datosActividades=data.data;      
    });
  }

  cerrar() {
    this.dialogRef.close();
  }
}
