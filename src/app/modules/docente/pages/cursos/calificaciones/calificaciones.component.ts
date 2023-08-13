import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CursoModel } from '../../../models/cursoModel';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgregarActividadModalComponent } from '../actividades/agregar-actividad-modal/agregar-actividad-modal.component';
import { ModificarActividadModalComponent } from '../actividades/modificar-actividad-modal/modificar-actividad-modal.component';
import { InformacionActividadModalComponent } from '../actividades/informacion-actividad-modal/informacion-actividad-modal.component';
import { BorrarActividadModalComponent } from '../actividades/borrar-actividad-modal/borrar-actividad-modal.component';
import { DocentesService } from '../../../services/docentes.service';
import { ActividadModel } from '../../../models/actividadModel';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EntregaModel } from '../../../models/entregaModel';
import { ParticipanteModel } from '../../../models/participanteModel';


@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.css']
})
export class CalificacionesComponent implements OnInit, OnDestroy {
  curso!: CursoModel;
  actividades!: ActividadModel[];
  entregas!: EntregaModel[];
  participantes!: ParticipanteModel[];
  editar = false;
  editarIndex: number | null = null;
  calificacion!: number;
  isOpen = false;

  isOpen2 = false;
  selectedOption = "Actividad";

  selectedOption2 = "Seleccionar";
  inputPlaceholder = "Nombre de la actividad";
  actividad!: ActividadModel;
  private subscription!: Subscription;




  options = [
    { value: 1, label: 'Actividad' },
    { value: 2, label: 'Estudiante' },
  ];

  public mostrarContenido = false;

  constructor(private modalService: NgbModal, private _docentesService: DocentesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const state = history.state;
    this.curso = state.curso;
    this.actividad = state.actividad;
    this.obtenerActividades();

    if (this.actividad) {
      this.selectedOption2 = this.actividad.nombre_actividad
    }

    this._docentesService.getUpdate().subscribe((value: boolean) => {
      if (value) {
        this._docentesService.obtenerEntregas(this.curso.id_curso).subscribe(data => {
          this.entregas = data.data;          
        });
      }
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getActividad(idActividad: number): ActividadModel {
    return this.actividades.find(a => a.id_actividad === idActividad)!;
  }

  getEstudiante(idEstudiante: number): ParticipanteModel {
    return this.participantes.find(a => a.id_participante === idEstudiante)!;
  }

  filtrar() {
    if (this.selectedOption == "Actividad"){
      return this.entregas.filter(a =>  this.getActividad(a.actividad_entrega).nombre_actividad === this.selectedOption2);
    } else {
      return this.entregas.filter(a =>  this.getEstudiante(a.estudiante_entrega).nombrescompletos_participante === this.selectedOption2);
    }
  }

  obtenerActividades() {
    this._docentesService.obtenerActividades(this.curso.id_curso).subscribe(data => {
      this.actividades = data.data
    });

    this._docentesService.obtenerEntregas(this.curso.id_curso).subscribe(data => {
      this.entregas = data.data
    });

    this._docentesService.obtenerParticipantes(this.curso.id_curso).subscribe(data => {
      this.participantes = data.data
    });

  }

  cambiarEditar() {
    this.editar = !this.editar;
  }

  toggleSelect() {
    this.isOpen = !this.isOpen;
  }

  toggleSelect2() {
    this.isOpen2 = !this.isOpen2;
  }

  selectOption(option: any) {
    this.selectedOption = option.label;
    this.isOpen = false;
    this.selectedOption2 = "Seleccionar"
  }

  selectOption2(actividad: string) {
    this.selectedOption2 = actividad;
    this.isOpen2 = false;

  }


  cambiarEditarIndex(index: number | null) {
    this.editarIndex = index;
  }

  openAgregar(): void {
    const modalRef = this.modalService.open(AgregarActividadModalComponent, { centered: true, size: 'md' });
  }

  openModificar(actividad: ActividadModel): void {
    const modalRef = this.modalService.open(ModificarActividadModalComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.actividad = actividad;

  }

  openInformacion(actividad: ActividadModel): void {
    const modalRef = this.modalService.open(InformacionActividadModalComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.actividad = actividad;

  }

  openBorrar(actividad: ActividadModel): void {
    const modalRef = this.modalService.open(BorrarActividadModalComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.actividad = actividad;

  }

  calificarEntrega(actividad: number, estudiante: number, calificacion: number){
    this._docentesService.calificarEntrega(actividad, estudiante, calificacion).subscribe(data => {      
      this.editarIndex = null;
      this._docentesService.sendUpdate(true);

    })
  }

}
