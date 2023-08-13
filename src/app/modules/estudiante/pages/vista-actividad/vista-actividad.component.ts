import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActividadesModel } from '../../models/actividadesModel';
import { CursoModel } from '../../models/cursoModel';
import { EntregaModel } from '../../models/EntregaModel';
import { PresentarActividad } from '../../models/presentarActividad';
import { ActividadesService } from '../materia/services/actividades.service';
import { DatePipe, Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UpdateEntregaModel } from '../../models/updateEntrega';
import { EstudiantePerfil } from '../../models/estudianteperfil.model';

@Component({
  selector: 'app-vista-actividad',
  templateUrl: './vista-actividad.component.html',
  styleUrls: ['./vista-actividad.component.css'],
})
export class VistaActividadComponent implements OnInit {
  @Input() idActividad!: number;
  entregaForm!: FormGroup;

  curso!: CursoModel;
  dataSourceActividades!: ActividadesModel[];
  obtenerEntregas!: EntregaModel[];
  presentarActividad: PresentarActividad[] = [];
  dataSourceObtenerDatosEstudiante!: EstudiantePerfil[];

  id_curso: number = 0;
  public id_entrega: number = 0;
  id = JSON.parse(localStorage.getItem("Usuario")!).id_usuario;


  public presentar: boolean = true;
  public presentarEditar = 5;
  public presentarEdicion: boolean = true;
  datosEntrega: any;
  datosEntregaModificar: any;
  constructor(
    private router: Router,
    private actividadService: ActividadesService,private formBuilder: FormBuilder,  private datePipe: DatePipe,
    private location: Location
  ) {
    this.entregaForm = this.formBuilder.group({
      fechaEnvio_entrega: [],
      fechaModificacion_entrega: [],
      archivo_entrega: [],
      estado_entrega: [],
    })
  }

  ngOnInit() {
    this.mostrarActividades();
  }

  mostrarActividades() {
    this.actividadService
      .obtenerDatosEstudiante(this.id)
      .subscribe((data) => (this.dataSourceObtenerDatosEstudiante = data.data));
    this.curso = history.state.data;
    this.id_curso = this.curso.id_curso;
    this.actividadService.obtenerEntregas().subscribe((data) => {
      this.obtenerEntregas = data.data;
      this.actividadService
        .obtenerActividades(this.curso.id_curso)
        .subscribe((data) => {
          this.dataSourceActividades = data.data;
          for (let i = 0; i < this.obtenerEntregas.length; i++) {
            for (let j = 0; j < this.dataSourceActividades.length; j++) {
              if (
                this.obtenerEntregas[i].actividad_entrega ==
                  this.dataSourceActividades[j].id_actividad &&
                this.dataSourceActividades[j].id_actividad == this.idActividad && 
                this.obtenerEntregas[i].estudiante_entrega ==
                  this.dataSourceObtenerDatosEstudiante[0].id_estudiante
              ) {
                const presentarLaActividad: PresentarActividad = {
                  id_actividad: this.dataSourceActividades[j].id_actividad,
                  id_entrega: this.obtenerEntregas[i].id_entrega,
                  nombre_actividad: this.dataSourceActividades[j].nombre_actividad,
                  descripcion_actividad: this.dataSourceActividades[j].descripcion_actividad,
                  tipo_actividad: this.dataSourceActividades[j].tipo_actividad,
                  fechaPublicacion_actividad: this.dataSourceActividades[j].fechaPublicacion_actividad,
                  fechaVencimiento_actividad: this.dataSourceActividades[j].fechaVencimiento_actividad,
                  fechaEnvio_entrega: this.obtenerEntregas[j].fechaEnvio_entrega,
                  fechaModificacion_entrega: this.obtenerEntregas[i].fechaModificacion_entrega,
                  actividad_entrega: this.obtenerEntregas[i].actividad_entrega,
                  archivo_entrega: this.obtenerEntregas[i].archivo_entrega,
                  calificacion_entrega: this.obtenerEntregas[i].calificacion_entrega,
                  estado_entrega: this.obtenerEntregas[i].estado_entrega,
                };
                this.presentarActividad.push(presentarLaActividad);
                
                this.datosEntrega = presentarLaActividad;
                this.datosEntregaModificar = presentarLaActividad;
              }
            }
          }
        });
    });
  }

  regresar() {
    this.location.back();
  }

  editarEntrega() {
    this.actividadService.presentarEdicion = false;
    this.presentar = this.actividadService.presentarEdicion;
  }

  cancelarAccion() {
    this.actividadService.presentarEdicion = true;
    this.presentar = this.actividadService.presentarEdicion;
  }
  
  guardar(event: any) {
    const archivoSeleccionado = this.entregaForm.get('archivo_entrega')?.value;    
    const entrega: UpdateEntregaModel = {
      id_entrega: this.id_entrega,
      fechaEnvio_entrega: this.presentarActividad[0].fechaEnvio_entrega, // utilizar el valor existente
      fechaModificacion_entrega: this.convertirFecha(new Date().toISOString()), // utilizar el valor actualizado
      archivo_entrega: this.presentarActividad[0].archivo_entrega = archivoSeleccionado, // utilizar el valor nuevo o existente
      estado_entrega: this.presentarActividad[0].archivo_entrega = "Enviada", // utilizar el valor existente 
    }    
    this.datosEntrega.fechaModificacion_entrega = entrega.fechaModificacion_entrega.toString();
    this.datosEntrega.archivo_entrega = entrega.archivo_entrega;
    this.datosEntrega.estado_entrega  = entrega.estado_entrega;
    this.actividadService.presentarEdicion = true;
    this.presentar = this.actividadService.presentarEdicion;
  }
  
  convertirFecha(fecha: string): string {
    var fechaConvertida = this.datePipe.transform(fecha, 'yyyy-MM-dd')!;
    return fechaConvertida!;
  }
}
