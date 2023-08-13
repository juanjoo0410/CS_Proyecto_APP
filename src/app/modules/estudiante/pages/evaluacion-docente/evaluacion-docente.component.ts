import { Component, OnInit } from '@angular/core';
import { CursosService } from '../cursos/services/cursos.service';
import { CursoModel } from '../../models/cursoModel';
import { ParticipantesService } from '../participantes/servicios/services/participantes.service';
import { ParticipanteModel } from 'src/app/modules/docente/models/participanteModel';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistrarModalComponent } from './registrar-modal/registrar-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evaluacion-docente',
  templateUrl: './evaluacion-docente.component.html',
  styleUrls: ['./evaluacion-docente.component.css']
})
export class EvaluacionDocenteComponent implements OnInit {
  id = JSON.parse(localStorage.getItem("Usuario")!).id_usuario;
  curso!: CursoModel[];
  docente = '';
  listaParticipantes!: ParticipanteModel[];
  selected = false;
  isOpen = false;
  selectedOption = "Seleccione una materia";

  criterio1: number = 0;
  criterio2: number = 0;
  criterio3: number = 0;
  criterio4: number = 0;
  criterio5: number = 0;
  criterio6: number = 0;
  criterio7: number = 0;
  criterio8: number = 0;
  criterio9: number = 0;
  criterio10: number = 0;
  resultado: number = 0;

  promedio() {
    this.resultado = (
      this.criterio1 + 
      this.criterio2 + 
      this.criterio3 + 
      this.criterio4 + 
      this.criterio5 + 
      this.criterio6 + 
      this.criterio7 + 
      this.criterio8 + 
      this.criterio9 + 
      this.criterio10) / 10;
  }

  constructor(
    private cursosService: CursosService, 
    private participantes: ParticipantesService, 
    private modalService: NgbModal, 
    private router: Router) { }

  ngOnInit() {
    this.cursosService.obtenerDatosEstudiante(this.id).subscribe((data) => {      
      this.cursosService
        .obtenerCurso(data.data[0].id_estudiante)
        .subscribe((dato) => {          
          this.curso = dato.data;
        });
    });
  }

  toggleSelect() {
    this.isOpen = !this.isOpen;
  }

  openRegistrar(): void {
    const modalRef = this.modalService.open(RegistrarModalComponent, { 
      centered: true, size: 'md', backdrop: 'static', keyboard: false 
    });
    modalRef.componentInstance.curso = this.curso;
    modalRef.closed.subscribe( data => {
      this.router.navigate(['/home']);
    })
  }

  selectOption(option: any) {
    this.selectedOption = option.nombre_materia;
    this.isOpen = false;
    this.selected = true;
    this.docente = option.nombre_docente;
    this.participantes.ObtenerParticipantes(option.id_curso).subscribe((data) => {    
      this.listaParticipantes = data.data;      
      this.docente=this.listaParticipantes.filter(participante =>
        participante.rol_participante.includes("Docente")
      )[0].nombrescompletos_participante;
    })
  }

  volver() {
    this.router.navigate(['/estudiante/horario']);
  }
}