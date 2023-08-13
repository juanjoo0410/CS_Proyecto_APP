import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActaModel } from '../../models/actaModel';
import { CursoModel } from '../../models/cursoModel';
import { DocentesService } from '../../services/docentes.service';
import { GenerandoModalComponent } from './generando-modal/generando-modal.component';


@Component({
  selector: 'app-acta',
  templateUrl: './acta.component.html',
  styleUrls: ['./acta.component.css']
})
export class ActaComponent {
  cursos!: CursoModel[];
  curso!: CursoModel;
  isOpen = false;
  acta = false;
  id = JSON.parse(localStorage.getItem("Usuario")!).id_usuario;
  selectedOption = "Seleccionar";
  selectedOption2 = "Curso";
  inputPlaceholder = "Nombre de la actividad";
  actas!: ActaModel[];

  options = [
    { value: 1, label: 'Actividad' },
    { value: 2, label: 'Estudiante' },
  ];

  constructor(private modalService: NgbModal, private _docentesService: DocentesService, private route: ActivatedRoute, private router: Router) { }

  
  ngOnInit(): void {

    this._docentesService.obtenerIdDocente(this.id).subscribe( docente => {
      
      this._docentesService.obtenerCursos(docente.data[0].id_docente).subscribe( data => {
        this.cursos = data.data;

      })  
    })


    
    
  }

  openGenerar(): void {
    const modalRef = this.modalService.open(GenerandoModalComponent, { centered: true, size: 'md', backdrop: 'static', keyboard: false });
    this._docentesService.actualizarActa(this.curso.id_curso).subscribe( data => {
      console.log(data)
      this._docentesService.obtenerActa(this.curso.id_curso).subscribe( data => {
        this.actas = data.data
      })  
    })
    
    modalRef.componentInstance.curso = this.curso;
    modalRef.closed.subscribe( data => {
      this.acta = true
    })

  }

  toggleSelect() {
    this.isOpen = !this.isOpen;
  }

  selectOption(curso: CursoModel) {
    this.selectedOption = curso.nombre_materia.toString();
    this.selectedOption2 = curso.nombre_paralelo.toString();
    this.curso = curso;
    this.acta = false

    this.isOpen = false;
    if (this.selectedOption === 'Actividad') {
      this.inputPlaceholder = 'Nombre de la actividad';
    } else if (this.selectedOption === 'Estudiante') {
      this.inputPlaceholder = 'Nombre del estudiante';
    }
  }

}
