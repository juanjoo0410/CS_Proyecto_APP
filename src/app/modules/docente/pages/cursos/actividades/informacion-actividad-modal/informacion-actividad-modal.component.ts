import { Component, Input } from '@angular/core';
import { ActividadModel } from 'src/app/modules/docente/models/actividadModel';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-informacion-actividad-modal',
  templateUrl: './informacion-actividad-modal.component.html',
  styleUrls: ['./informacion-actividad-modal.component.css']
})
export class InformacionActividadModalComponent {
  @Input() public actividad!: ActividadModel;

  constructor(public activeModal: NgbActiveModal) { } 

}
