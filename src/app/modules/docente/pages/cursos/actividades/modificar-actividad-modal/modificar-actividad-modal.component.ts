import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActividadModel } from 'src/app/modules/docente/models/actividadModel';
import { DocentesService } from 'src/app/modules/docente/services/docentes.service';
import { DatePipe } from '@angular/common';





@Component({
  selector: 'app-modificar-actividad-modal',
  templateUrl: './modificar-actividad-modal.component.html',
  styleUrls: ['./modificar-actividad-modal.component.css'],

})

export class ModificarActividadModalComponent implements OnInit {
  actividadForm!: FormGroup;
  submitted = false;
  @Input() public actividad!: ActividadModel;


  constructor(private router: Router, public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private _docentesService: DocentesService, private datePipe: DatePipe) {

  }


  ngOnInit(): void {
    const date = new Date(this.actividad.fechaVencimiento_actividad);
    date.setDate(date.getDate() + 1);
    const fecha = date.toISOString().slice(0, 10);

    this.actividadForm = this.formBuilder.group({
      fechaVencimiento_actividad: [fecha, [Validators.required, validarFechaVencimiento]],
      fechaPublicacion_actividad: [this.actividad.fechaPublicacion_actividad],
      nombre_actividad: [this.actividad.nombre_actividad, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      descripcion_actividad: [this.actividad.descripcion_actividad, Validators.required],
      archivosPermitidos_actividad: [this.actividad.archivosPermitidos_actividad, Validators.required],
      tipo_actividad: [this.actividad.tipo_actividad, Validators.required],
    }
    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.actividadForm.invalid) {
      return;
    }

    var actividad = {
      id_actividad: this.actividad.id_actividad,
      curso_actividad: this.actividad.curso_actividad,
      fechaPublicacion_actividad: this.actividad.fechaPublicacion_actividad,
      fechaVencimiento_actividad: this.convertirFecha(this.actividadForm.controls["fechaVencimiento_actividad"].value),
      nombre_actividad: this.actividadForm.controls["nombre_actividad"].value,
      descripcion_actividad: this.actividadForm.controls["descripcion_actividad"].value,
      archivosPermitidos_actividad: this.actividadForm.controls["archivosPermitidos_actividad"].value,
      tipo_actividad: this.actividadForm.controls["tipo_actividad"].value,
      envios: this.actividad.envios
    }

    this._docentesService.modificarActividad(actividad).subscribe(data => {      
      this._docentesService.sendUpdate(true);
      this.activeModal.close();
    })

  }

  convertirFecha(fecha: string): string {
    var fechaConvertida = this.datePipe.transform(fecha, 'yyyy-MM-dd')!;    
    return fechaConvertida!;
  }

  get f() { return this.actividadForm.controls; }



}

function validarFechaVencimiento(control: AbstractControl): {[key: string]: any} | null {
  const fechaVencimiento = new Date(control.value);
  const fechaActual = new Date();
  if (fechaVencimiento <= fechaActual) {
    return { fechaInvalida: true };
  }
  return null;
}