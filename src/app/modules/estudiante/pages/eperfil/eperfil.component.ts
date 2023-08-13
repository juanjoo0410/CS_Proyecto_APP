import { Component } from '@angular/core';
import { EstudiantePerfil } from '../../models/estudianteperfil.model';
import { ItemMatricula } from '../../models/itemmatricula.model';
import { OrdenPago } from '../../models/ordenpago.model';
import { EPerfilService } from '../eperfil/services/eperfil.service';
import { combineLatest } from 'rxjs';


@Component({
  selector: 'app-eperfil',
  templateUrl: './eperfil.component.html',
  styleUrls: ['./eperfil.component.css']
})
export class EperfilComponent {
  panelOpenState = false;
  id = JSON.parse(localStorage.getItem("Usuario")!).id_usuario;
  dataSource!: any;
  dataSourceItemMatricula!: ItemMatricula[];
  dataSoruceOrdenPago!: OrdenPago[];
  dataSourceOrdenMatricula: any;
  constructor(private estudianteuser: EPerfilService
  ){
  }
  
  
  
  ngOnInit(): void {
    this.obtenerDatosPerfil();
  }


  obtenerDatosPerfil(){
    this.estudianteuser.obtenerDatosEstudiante(this.id).subscribe(data => {
      const estudiante: EstudiantePerfil = {
        id_usuario: data.data[0].id_usuario,
        nombre_usuario: data.data[0].nombre_usuario,
        contrasena_usuario: "********",
        rol_usuario: data.data[0].rol_usuario,
        id_estudiante: data.data[0].id_estudiante,
        nombres_estudiante: data.data[0].nombres_estudiante,
        apellidos_estudiante: data.data[0].apellidos_estudiante,
        cedula_estudiante: data.data[0].cedula_estudiante,
        fechaNacimiento_estudiante: data.data[0].fechaNacimiento_estudiante,
        edad_estudiante: data.data[0].edad_estudiante,
        direccion_estudiante: data.data[0].direccion_estudiante,
        telefono_estudiante: data.data[0].telefono_estudiante,
        email_estudiante: data.data[0].email_estudiante,
        nivelEducacion_estudiante: data.data[0].nivelEducacion_estudiante,
        promedioAnterior_estudiante: data.data[0].promedioAnterior_estudiante,
        medio_estudiante: data.data[0].medio_estudiante,
        estado_estudiante: data.data[0].estado_estudiante
      };
      this.dataSource = estudiante;
    });
      this.obtenerOrdenPago();
  }

  obtenerOrdenPago(){
    
    this.estudianteuser.obtenerItemMatricula(this.id).subscribe(data=>{
      this.dataSourceItemMatricula=data.data;
      
      // Usa el id_matricula obtenido para llamar a la función obtenerOrdenPago
      const id_matricula = this.dataSourceItemMatricula[0].id_matricula;
      this.estudianteuser.obtenerOrdenPago(id_matricula).subscribe(data=>{
        this.dataSoruceOrdenPago=data.data;
        
        // Crea objeto combinando los datos de dataSourceItemMatricula y dataSoruceOrdenPago
        const itemmat: ItemMatricula = {
          id_matricula: this.dataSourceItemMatricula[0].id_matricula,
          estudiante_matricula: this.dataSourceItemMatricula[0].estudiante_matricula,
          fecha_matricula: this.dataSourceItemMatricula[0]?.fecha_matricula,
          ciclo_matricula: this.dataSourceItemMatricula[0].ciclo_matricula,
          id_itemMatricula: this.dataSoruceOrdenPago[0].id_itemMatricula,
          matricula_pagoMatricula: this.dataSoruceOrdenPago[0].matricula_pagoMatricula,
          item_pagoMatricula: this.dataSoruceOrdenPago[0].item_pagoMatricula,
          cantidad_pagoMatricula: this.dataSoruceOrdenPago[0].cantidad_pagoMatricula,
          subtotal_pagoMatricula: this.dataSoruceOrdenPago[0].subtotal_pagoMatricula,
          descuento_pagoMatricula: this.dataSoruceOrdenPago[0].descuento_pagoMatricula,
          total_pagoMatricula: this.dataSoruceOrdenPago[0].total_pagoMatricula,
        };
        this.dataSourceOrdenMatricula = itemmat;
      });
    });
    
  }
}