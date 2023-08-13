import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AsistenciasModel } from '../../models/asistenciasModel';
import { EstudiantePerfil } from '../../models/estudianteperfil.model';
import { AsistenciasService } from './services/asistencias.service';

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.component.html',
  styleUrls: ['./asistencias.component.css'],
})
export class AsistenciasComponent {
  displayedColumns = ['fecha', 'estado'];
  dataSource!: MatTableDataSource<AsistenciasModel>;
  datosCompletos!: EstudiantePerfil[];
  
  id = JSON.parse(localStorage.getItem("Usuario")!).id_usuario;
  //opciones para jacer el filtrado en la tabla
  filterValue = '';
  selectedState = 'Presente';
  selected = '0';

  estados = [
    { value: '', viewValue: 'Todos' },
    { value: 'Presente', viewValue: 'Presente' },
    { value: 'Falta', viewValue: 'Falta' },
  ];

  constructor(
    private asistenciasservice: AsistenciasService
  ) {}
  ngOnInit() {
    this.id = JSON.parse(localStorage.getItem("Usuario")!).id_usuario;
    this.dataSource = new MatTableDataSource<AsistenciasModel>();
    this.asistenciasservice
      .obtenerDatosEstudiante(this.id)
      .subscribe((data) => {
        this.asistenciasservice
          .obtenerAsistencias(data.data[0].id_estudiante)
          .subscribe((dato) => {
            this.dataSource.data = dato.data;            
          });
      });
  }

  filterData() {
    if (this.selected === '1') {
      const filteredData = this.dataSource.data.filter((asistencia) =>
        asistencia.estado_asistencia
          .toLowerCase()
          .includes(this.filterValue.trim().toLowerCase())
      );
      this.dataSource.filter = this.filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data, filter) => {
        return (
          data.estado_asistencia.trim().toLowerCase().indexOf(filter) !== -1
        );
      };
    } else if (this.selected === '2') {
      const filteredData = this.dataSource.data.filter(
        (asistencia) =>
          asistencia.estado_asistencia.toLowerCase() ===
          this.selectedState.trim().toLowerCase()
      );
      this.dataSource.filter = this.selectedState.trim().toLowerCase();
      this.dataSource.filterPredicate = (data, filter) => {
        return data.estado_asistencia.trim().toLowerCase() === filter;
      };
    }
  }
}
