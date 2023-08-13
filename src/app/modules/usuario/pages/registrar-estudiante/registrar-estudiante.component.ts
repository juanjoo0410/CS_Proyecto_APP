import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EstudianteModel } from '../../models/estudianteModel';
import { UsuariosService } from '../../services/usuarios.service';
import { RegistrarModalComponent } from '../registrar-modal/registrar-modal.component';

@Component({
  selector: 'app-registrar-estudiante',
  templateUrl: './registrar-estudiante.component.html',
  styleUrls: ['./registrar-estudiante.component.css']
})
export class RegistrarEstudianteComponent implements OnInit {
  @Input() public usuario!: string;
  @Input() public contrasena!: string;
  estudianteForm!: FormGroup;
  submitted = false;
  opcionesNivelEducacion = [
    { texto: '1er nivel' },
    { texto: '2do nivel' },
    { texto: '3er nivel' },
    { texto: '4to nivel' },
  ];

  constructor(private _formBuilder: FormBuilder, private router: Router, private _usuariosService: UsuariosService, private modalService: NgbModal) { }


  ngOnInit(): void {    
    this.estudianteForm = this._formBuilder.group({
      nombres_estudiante: ['', Validators.required],
      apellidos_estudiante: ['', Validators.required],
      cedula_estudiante: ['', [Validators.required, Validators.pattern("^[0-9]{1,10}$")]],
      fechaNacimiento_estudiante: ['', [fechaRequerida, fechaPatron, fechaValida]],
      direccion_estudiante: ['', Validators.required],
      telefono_estudiante: ['', [Validators.required, Validators.pattern("^[0-9]{1,10}$")]],
      email_estudiante: ['', [Validators.required, Validators.email]],
      nivelEducacion_estudiante: ['', Validators.required],
      promedioAnterior_estudiante: ['', [Validators.required, Validators.min(0), Validators.max(10), Validators.pattern("^[0-9]+$")]],
      medio_estudiante: ['', [Validators.required]]
    });
  }

  registrarEstudiante(form: FormGroup) {
    this.submitted = true;
    if (this.estudianteForm.invalid) {
      return;
    }

    const estudiante: EstudianteModel = {
      nombre_usuario: this.usuario,
      contrasena_usuario: this.contrasena,
      rol_usuario: 1, // rol de estudiante
      nombres_estudiante: form.value.nombres_estudiante,
      apellidos_estudiante: form.value.apellidos_estudiante,
      cedula_estudiante: form.value.cedula_estudiante,
      fechaNacimiento_estudiante: form.value.fechaNacimiento_estudiante,
      edad_estudiante: this.calcularEdad(form.value.fechaNacimiento_estudiante),
      direccion_estudiante: form.value.direccion_estudiante,
      telefono_estudiante: form.value.telefono_estudiante,
      email_estudiante: form.value.email_estudiante,
      nivelEducacion_estudiante: form.value.nivelEducacion_estudiante,
      promedioAnterior_estudiante: form.value.promedioAnterior_estudiante,
      medio_estudiante: form.value.medio_estudiante,
    };

    this._usuariosService.agregarEstudiante(estudiante).subscribe(data => {      
      this.openGenerar()
    });
  }

  calcularEdad(fechaNacimiento: string): number {
    const hoy = new Date();
    const fechaNac = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }
    return edad;
  }

  openGenerar(): void {
    const modalRef = this.modalService.open(RegistrarModalComponent, { centered: true, size: 'md', backdrop: 'static', keyboard: false });
    modalRef.closed.subscribe( data => {
      this.router.navigate(['/home']);

    })
    modalRef.componentInstance.docente = false;

  }





}

function fechaRequerida(control: AbstractControl): { [key: string]: boolean } | null {
  return control.value ? null : { fechaRequerida: true };
}

function fechaPatron(control: AbstractControl): { [key: string]: boolean } | null {
  const patron = /^\d{4}-\d{2}-\d{2}$/;
  return patron.test(control.value) ? null : { fechaPatron: true };
}

function fechaValida(control: AbstractControl): { [key: string]: boolean } | null {
  const fecha = new Date(control.value);
  return fecha instanceof Date && !isNaN(fecha.getTime()) ? null : { fechaInvalida: true };
}