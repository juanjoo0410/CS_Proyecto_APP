import { Component } from '@angular/core';
import { CursoModel } from '../../models/cursoModel';
import { ActividadesService } from './services/actividades.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from '../cursos/services/cursos.service';
import { ActividadesModel } from '../../models/actividadesModel';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EntregaModel } from '../../models/EntregaModel';
import { presentarActividadesModel } from '../../models/presentarActividadesModel';
import { EstudiantePerfil } from '../../models/estudianteperfil.model';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css'],
})
export class MateriaComponent {
  selected = '';
  curso!: CursoModel;
  dataSourceActividades!: ActividadesModel[];
  obtenerEntregas!: EntregaModel[];
  presentarActividadesModel: presentarActividadesModel[] = [];
  dataSourceObtenerDatosEstudiante!: EstudiantePerfil[];
  id_curso: number = 0;
  id = JSON.parse(localStorage.getItem("Usuario")!).id_usuario;

  public entregasActividades: any;
  public mostrarContenido = false;
  opcionSeleccionada = 1;

  public aparecerComponente = 1;

  idActividad = 0;

  public presentarEdicion: boolean = this.actividadService.presentarEdicion;
  constructor(
    private http: HttpClient,
    private actividadService: ActividadesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mostrarMaterias();
  }
  mostrarMaterias() {
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
                this.obtenerEntregas[i].estudiante_entrega ==
                  this.dataSourceObtenerDatosEstudiante[0].id_estudiante
              ) {
                const entregaActividad: presentarActividadesModel = {
                  id_actividad: this.dataSourceActividades[j].id_actividad,
                  nombre_actividad:
                    this.dataSourceActividades[j].nombre_actividad,
                  estado_entrega: this.obtenerEntregas[i].estado_entrega,
                  fechaVencimiento_actividad:
                    this.dataSourceActividades[j].fechaVencimiento_actividad,
                  calificacion_entrega:
                    this.obtenerEntregas[i].calificacion_entrega,
                };
                this.presentarActividadesModel.push(entregaActividad);
              }
            }
          }
        });
    });
  }
  seleccionarOpcion(opcion: number) {
    this.opcionSeleccionada = opcion;
  }
  onSelectAccion(event: number) {
    this.aparecerComponente = event;
  }

  verActividad(actividades: any) {
    //this.router.navigate(['/estudiante/vista-actividad'], { queryParams: { id: actividades } });
    this.idActividad = Number(actividades);
  }
}
