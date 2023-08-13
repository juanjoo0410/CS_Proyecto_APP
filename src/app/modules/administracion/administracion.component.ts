import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Top5Docente } from './models/top5Docente';
import { Top5Estudiante } from './models/top5Estudiante';
import { DocenteAdministracionService } from './services/docente-administracion.service';
import { EstudianteAdministracionService } from './services/estudiante-administracion.service';
import { Estudiante } from './models/estudianteModel';
import { Docente } from './models/docenteModel';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit{
  datosDocentes: Top5Docente[] = [];
  datosEstudiantes: Top5Estudiante[] = [];
  totalEstudiantes = 0;
  totalDocentes = 0;

  constructor(
    private router: Router,
    private docenteService:DocenteAdministracionService,
    private estudianteService:EstudianteAdministracionService,
    ) {}

  ngOnInit(): void {
    this.docenteService.obtenerTopDocentes('2022-2023 CI').subscribe(data => {
      this.datosDocentes=data.data;      
    });

    this.estudianteService.obtenerTopEstudiantes('2022-2023 CI').subscribe(data => {
      this.datosEstudiantes=data.data;      
    });

    this.estudianteService.obtenerEstudiantes().subscribe(respuesta =>{
      let listaEstudiantes: Estudiante[] = respuesta.data;
      this.totalEstudiantes = listaEstudiantes.length;
    });

    this.docenteService.obtenerDocentes().subscribe(respuesta =>{
      let listaDocentes: Docente[] = respuesta.data;
      this.totalDocentes = listaDocentes.length;
    });
  }

  irDocentes(){
    this.router.navigate(['/administracion/docente-administracion']);
  }
  irEstudiantes(){
    this.router.navigate(['/administracion/estudiante-administracion']);
  }
}
