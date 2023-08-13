import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Actividad } from '../../models/actividadModel';
import { EstudianteAdministracionService } from '../../services/estudiante-administracion.service';

export interface PeriodicElement {
  id: number;
  actividad: string;
}

@Component({
  selector: 'app-act-c-estudiante-administracion',
  templateUrl: './act-c-estudiante-administracion.component.html',
  styleUrls: ['./act-c-estudiante-administracion.component.css']
})
export class ActCEstudianteAdministracionComponent implements OnInit {
  datosActividad: Actividad[] = [];

  displayedColumns: string[] = ['actividad'];
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id_estudiante: number, id_curso: number },
    private dialogRef: MatDialogRef<ActCEstudianteAdministracionComponent>,
    private estudianteService:EstudianteAdministracionService) {}

  ngOnInit(): void {
      this.estudianteService.obtenerEntregasEstudiantes('Enviada',this.data.id_estudiante, this.data.id_curso).subscribe(data => {
      this.datosActividad=data.data;      
    });
  }

  cerrar() {
    this.dialogRef.close();
  }
}
