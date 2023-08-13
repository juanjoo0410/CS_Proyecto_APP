import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Docente } from '../../models/docenteModel';
import { PagoDocente } from '../../models/pagoDocentesModel';
import { DocenteAdministracionService } from '../../services/docente-administracion.service';

export interface PeriodicElement {
  fecha: string;
  sueldo: number;
  faltas: number;
  descuento: number;
  total: number;
  cedula: string;
  nombreCompleto: string;
}

@Component({
  selector: 'app-pagos-docente-administracion',
  templateUrl: './pagos-docente-administracion.component.html',
  styleUrls: ['./pagos-docente-administracion.component.css']
})
export class PagosDocenteAdministracionComponent implements OnInit {
  datosPagoDocentes: PagoDocente[] = [];
  datosDocentes: Docente[] = [];

  selectedFiltro: string = '';

  displayedColumns: string[] = ['fecha', 'sueldo', 'faltas', 'descuento', 'total', 'cedula', 'nombreCompleto'];
  
  filtro: string[] = [
    'Cedula',
    'Nombre',
    'Fecha',
  ];

  opciones: string[] = [
    'Opcion 1',
    'Opcion 2',
    'Opcion 3',
  ];
  txtCedula: FormControl = new FormControl('');

  dataSource: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private docenteService:DocenteAdministracionService) {}

  ngOnInit(): void {
    this.docenteService.obtenerPagoDocentes().subscribe(respuesta =>{
      this.datosPagoDocentes = respuesta.data;
      this.dataSource = new MatTableDataSource<any>(this.datosPagoDocentes);      

      this.docenteService.obtenerDocentes().subscribe(respuesta =>{
        this.datosDocentes=respuesta.data;        
      });

    });

    this.selectedFiltro = this.filtro[0];

  }

  filterByCedula() {
    this.dataSource.filter = this.txtCedula.value.trim().toLowerCase();
    this.dataSource.filterPredicate = function (data: any, filter: string) {
      return data.cedula_docente.toLocaleLowerCase().includes(filter);
    }
  }

  volver(){
    this.router.navigate(['/administracion/docente-administracion']);
  }
}
