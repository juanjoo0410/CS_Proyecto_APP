import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DocentesService } from '../../../../services/docentes.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-agregar-actividad-modal',
  templateUrl: './agregar-actividad-modal.component.html',
  styleUrls: ['./agregar-actividad-modal.component.css']
})
export class AgregarActividadModalComponent {
  actividadForm!: FormGroup;
  submitted = false;

  constructor(private router: Router, public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private _docentesService: DocentesService, private datePipe: DatePipe) {
    this.actividadForm = this.formBuilder.group({
      fechaVencimiento_actividad: ['', [Validators.required, validarFechaVencimiento]],
      fechaPublicacion_actividad: [''],
      nombre_actividad: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      descripcion_actividad: ['', Validators.required],
      archivosPermitidos_actividad: ['', Validators.required],
      tipo_actividad: ['', Validators.required],
      estado_actividad: [''],
    },
      {
        validators: [],
        updateOn: 'submit'
      }
    );

  }

  onSubmit() {
    this.submitted = true;
    if (this.actividadForm.invalid) {
      return;
    }

    var actividad = {
      curso_actividad: 1,
      fechaPublicacion_actividad: "2023-03-04",
      fechaVencimiento_actividad: this.convertirFecha(this.actividadForm.controls["fechaVencimiento_actividad"].value),
      nombre_actividad: this.actividadForm.controls["nombre_actividad"].value,
      descripcion_actividad: this.actividadForm.controls["descripcion_actividad"].value,
      archivosPermitidos_actividad: this.actividadForm.controls["archivosPermitidos_actividad"].value,
      tipo_actividad: this.actividadForm.controls["tipo_actividad"].value,
    }

    this._docentesService.agregarActividad(actividad).subscribe(data => {      
      this._docentesService.sendUpdate(true);
      this.activeModal.close();
    })
  }

  get f() { return this.actividadForm.controls; }

  convertirFecha(fecha: string): string {
    var fechaConvertida = this.datePipe.transform(fecha, 'yyyy-MM-dd')!;    
    return fechaConvertida!;
  }

}

function validarFechaVencimiento(control: AbstractControl): {[key: string]: any} | null {
  const fechaVencimiento = new Date(control.value);
  const fechaActual = new Date();
  if (fechaVencimiento <= fechaActual) {
    return { fechaInvalida: true };
  }
  return null;
}