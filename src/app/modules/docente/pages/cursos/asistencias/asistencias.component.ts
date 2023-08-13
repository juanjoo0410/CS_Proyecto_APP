import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CursoModel } from '../../../models/cursoModel';
import { ParticipanteModel } from '../../../models/participanteModel';
import { DocentesService } from '../../../services/docentes.service';
import { RegistrarModalComponent } from './registrar-modal/registrar-modal.component';

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.component.html',
  styleUrls: ['./asistencias.component.css']
})
export class AsistenciasComponent {


  @ViewChild('checkboxSeleccionarTodos', {static: false}) checkboxSeleccionarTodos!: ElementRef<HTMLInputElement>;
  @ViewChild('checkboxesParticipantes', {static: false}) checkboxesParticipantes!: ElementRef<HTMLInputElement>;


  public curso!: CursoModel;
  public participantes!: ParticipanteModel[];
  selectedOption = "Actividad";
  tabla = false;
  fechaValida = false;
  fecha = "";



  constructor(
    private modalService: NgbModal,
    private _docentesService: DocentesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.curso = history.state.curso;
    this._docentesService.obtenerParticipantes(this.curso.id_curso).subscribe(data => {
      this.participantes = data.data.filter((participante: { rol_participante: string; }) => participante.rol_participante === 'Estudiante');      
    })
  }

  openRegistrar(): void {
    const modalRef = this.modalService.open(RegistrarModalComponent, { centered: true, size: 'md', backdrop: 'static', keyboard: false });
    modalRef.componentInstance.curso = this.curso;
    modalRef.closed.subscribe( data => {
      this.tabla = false
      
    })

  }

  agregarAsistencia(){
    this.tabla = true;
  }
  
  seleccionarTodos() {
    const checkboxesParticipantes = this.checkboxesParticipantes.nativeElement.getElementsByTagName('input');
    for (let i = 0; i < checkboxesParticipantes.length; i++) {
      checkboxesParticipantes[i].checked = this.checkboxSeleccionarTodos.nativeElement.checked;
    }
  }

  cerrarTabla(){
    this.tabla = false;
  }

  esFechaValida(fecha: string) {
    const regex = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
  
    if (!regex.test(fecha)) {
      this.fechaValida = false;
      this.tabla = false;
    } else {

      const componentes = regex.exec(fecha);
      const dia = Number(componentes![1]);
      const mes = Number(componentes![3]);
      const anio = Number(componentes![5]);
    
      if (mes < 1 || mes > 12 || dia < 1 || dia > 31) {
        this.fechaValida =  false;
        this.tabla = false;
      }
    
      if (mes === 4 || mes === 6 || mes === 9 || mes === 11) {
        if (dia > 30) {
          this.fechaValida =  false;
          this.tabla = false;
        }
      } else if (mes === 2) {
        if ((anio % 4 === 0 && anio % 100 !== 0) || anio % 400 === 0) {
          if (dia > 29) {
            this.fechaValida =  false;
            this.tabla = false;
          }
        } else {
          if (dia > 28) {
            this.fechaValida =  false;
            this.tabla = false;
          }
        }
      }
    
      this.fechaValida =  true;

    }
  

  }

}
