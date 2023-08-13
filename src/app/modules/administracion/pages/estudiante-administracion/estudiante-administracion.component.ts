import { Component, OnInit, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Estudiante } from '../../models/estudianteModel';
import { EstudianteAdministracionService } from '../../services/estudiante-administracion.service';

@Component({
  selector: 'app-estudiante-administracion',
  templateUrl: './estudiante-administracion.component.html',
  styleUrls: ['./estudiante-administracion.component.css']
})
export class EstudianteAdministracionComponent implements OnInit{
  displayedColumns: string[] = ['id', 'cedula', 'nombreCompleto', 'ciclo', 'medioDifusion','acciones'];
  datosEstudiantes = new MatTableDataSource<Estudiante>();

  selectedFiltro: string = '';
  filtro: string[] = [
    'Cedula',
    'Nombre',
    'Ciclo',
    'Módulo',
    'Medio de Difusión',
  ];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private estudianteService:EstudianteAdministracionService) {}
  
    ngOnInit(): void {
      this.estudianteService.obtenerEstudiantes().subscribe(respuesta =>{
        this.datosEstudiantes=respuesta.data;
      });
      this.selectedFiltro = this.filtro[0];
    }

    verMateriasEstudiante(id: number) {
      this.router.navigate(['/administracion/ver-estudiante-administracion'], 
      { relativeTo:  this.route, queryParams: {id_estudiante:id} });
  }

  getMedioDifusion(medioDifusion: number) {
    switch (medioDifusion) {
      case 1:
        return 'Radio';
      case 2:
        return 'TV';
      case 3:
        return 'Periódico';
      case 4:
        return 'Volantes';
      case 5:
        return 'WhatApp';
      case 6:
        return 'Redes sociales';
      default:
        return '-';
    }
  }
}
