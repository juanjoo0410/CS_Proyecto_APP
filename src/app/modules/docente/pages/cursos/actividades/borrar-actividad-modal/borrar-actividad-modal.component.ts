import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActividadModel } from 'src/app/modules/docente/models/actividadModel';
import { DocentesService } from 'src/app/modules/docente/services/docentes.service';

@Component({
  selector: 'app-borrar-actividad-modal',
  templateUrl: './borrar-actividad-modal.component.html',
  styleUrls: ['./borrar-actividad-modal.component.css']
})
export class BorrarActividadModalComponent {
  @Input() public actividad!: ActividadModel;

  constructor(private _docentesService: DocentesService, public activeModal: NgbActiveModal){

  }

  borrarActividad(){
    this._docentesService.borrarActividad(this.actividad.id_actividad!).subscribe(data => {
      this._docentesService.sendUpdate(true);
      this.activeModal.close();

    });

  }


}
