import { Component, OnInit } from '@angular/core';
import { DocentesService } from '../../services/docentes.service';
import { DocentePerfilModel } from '../../models/docentePerfilModel';
import { ContratoDocenteModel } from '../../models/contratoDocenteModel';
import { DocenteModel } from '../../models/docente';
import { DocentePagoModel } from '../../models/docentePagoModel';

@Component({
  selector: 'app-dperfil',
  templateUrl: './dperfil.component.html',
  styleUrls: ['./dperfil.component.css'],
})
export class DperfilComponent implements OnInit {
  id = JSON.parse(localStorage.getItem("Usuario")!).id_usuario;

  panelOpenState = false;
  dataSource!: any;
  dataSourceObtenerContratoDocente: ContratoDocenteModel[] = [];
  dataSourceObtenerDocente: DocenteModel[] = [];
  dataSourceObtenerDocentePerfil!: DocentePerfilModel[];
  dataSourceObtenerPagoDocente: DocentePagoModel[] = [];
  dataSourceContratoDocente: any;
  dataSourcePagoDelDocente: any;
  constructor(
    private docenteUser: DocentesService
  ) {}

  ngOnInit() {
    this.obtenerDatosPerfil();
  }

  obtenerDatosPerfil() {
    this.docenteUser.obtenerDatosDocente(this.id).subscribe((data) => {
      const docente: DocentePerfilModel = {
        id_usuario: data.data[0].id_usuario,
        nombre_usuario: data.data[0].nombre_usuario,
        contrasena_usuario: "********",
        rol_usuario: data.data[0].rol_usuario,
        id_docente: data.data[0].id_docente,
        nombres_docente: data.data[0].nombres_docente,
        apellidos_docente: data.data[0].apellidos_docente,
        cedula_docente: data.data[0].cedula_docente,
        fechaNacimiento_docente: data.data[0].fechaNacimiento_docente,
        edad_docente: data.data[0].edad_docente,
        direccion_docente: data.data[0].direccion_docente,
        telefono_docente: data.data[0].telefono_docente,
        email_docente: data.data[0].email_docente,
        titulo_docente: data.data[0].titulo_docente,
        nivelEducacion_docente: data.data[0].nivelEducacion_docente,
      };
      this.dataSource = docente;
      this.obtenerDatosContrato();
      this.obtenerDatosPago();
    });
  }

  obtenerDatosContrato() {
    // obtener los datos del docente
    this.docenteUser
      .obtenerDatosDocente(this.id)
      .subscribe((data) => (this.dataSourceObtenerDocentePerfil = data.data));
    this.docenteUser.obtenerDocente().subscribe((data) => {
      this.dataSourceObtenerDocente = data.data;

      const usuario_docente = this.dataSourceObtenerDocente.find(
        (docente) => docente.usuario_docente === this.id
      )?.usuario_docente;

      // obtener el contrato correspondiente al docente
      if (usuario_docente) {
        this.docenteUser
          .obtenerContratoDocente(this.dataSourceObtenerDocentePerfil[0].id_docente)
          .subscribe((data) => {
            this.dataSourceObtenerContratoDocente = data.data;

            const contrato_docente = this.dataSourceObtenerContratoDocente.find(
              (contrato) => contrato.docente_contrato === this.dataSourceObtenerDocentePerfil[0].id_docente
            );

            if (contrato_docente) {
              const contrato: ContratoDocenteModel = {
                id_contrato: contrato_docente.id_contrato,
                docente_contrato: contrato_docente.docente_contrato,
                fecha_contrato: contrato_docente.fecha_contrato,
                ciclo_contrato: contrato_docente.ciclo_contrato,
                nombramiento_contrato: contrato_docente.nombramiento_contrato,
                especialidad_contrato: contrato_docente.especialidad_contrato,
                tipo_contrato: contrato_docente.tipo_contrato,
                jornada_contrato: contrato_docente.jornada_contrato,
                sueldo_contrato: contrato_docente.sueldo_contrato,
              };
              this.dataSourceContratoDocente = contrato;
            }
          });
      }
    });
  }

  obtenerDatosPago() {
    this.docenteUser.obtenerDatosDocente(this.id).subscribe((data) => {
      this.dataSourceObtenerDocentePerfil = data.data; // Accedemos al primer objeto en el arreglo    
      this.docenteUser.obtenerPagoDocente(this.dataSourceObtenerDocentePerfil[0].id_docente).subscribe((data) => { //llamaos el id_docente para hacer uso de este en el ordenPago
        this.dataSourceObtenerPagoDocente = data.data;
        const pago: DocentePagoModel = {
          docente_pagoDocente: data.data[0].docente_pagoDocente,
          fecha_pagoDocente: data.data[0].fecha_pagoDocente,
          sueldo_contrato: data.data[0].sueldo_contrato,
          faltas_pagoDocente: data.data[0].faltas_pagoDocente,
          descuento_pagoDocente: data.data[0].descuento_pagoDocente,
          total_pagoDocente: data.data[0].total_pagoDocente,
        };
        this.dataSourcePagoDelDocente = pago;
      });
    });
  }
}
