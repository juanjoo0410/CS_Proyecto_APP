import { Component, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DocentesService } from 'src/app/modules/docente/services/docentes.service';
import { DocenteModel } from '../../models/docenteModel';
import { UsuariosService } from '../../services/usuarios.service';
import { RegistrarModalComponent } from '../registrar-modal/registrar-modal.component';

@Component({
  selector: 'app-registrar-docente',
  templateUrl: './registrar-docente.component.html',
  styleUrls: ['./registrar-docente.component.css']
})
export class RegistrarDocenteComponent {
  @Input() public usuario!: string;
  @Input() public contrasena!: string;
  submitted = false;
  docenteForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder, private router: Router, private _usuariosService: UsuariosService, private modalService: NgbModal) {


  }


  ngOnInit(): void {
    this.docenteForm = this._formBuilder.group({
      nombres_docente: ['', Validators.required],
      apellidos_docente: ['', Validators.required],
      cedula_docente: ['', [Validators.required, Validators.pattern("^[0-9]{1,10}$")]],
      fechaNacimiento_docente: ['', [fechaRequerida, fechaPatron, fechaValida]],
      direccion_docente: ['', Validators.required],
      telefono_docente: ['', [Validators.required, Validators.pattern("^[0-9]{1,10}$")]],
      email_docente: ['', [Validators.required, Validators.email]],
      titulo_docente: ['', Validators.required],
      nivelEducacion_docente: ['', Validators.required]
    });

  }


  registrarDocente(form: FormGroup) {
    this.submitted = true;
    if (this.docenteForm.invalid) {
      return;
    }


    const docente: DocenteModel = {
      nombre_usuario: this.usuario,
      contrasena_usuario: this.contrasena,
      rol_usuario: 2, // rol de docente
      nombres_docente: form.value.nombres_docente,
      apellidos_docente: form.value.apellidos_docente,
      cedula_docente: form.value.cedula_docente,
      fechaNacimiento_docente: form.value.fechaNacimiento_docente,
      edad_docente: this.calcularEdad(form.value.fechaNacimiento_docente),
      direccion_docente: form.value.direccion_docente,
      telefono_docente: form.value.telefono_docente,
      email_docente: form.value.email_docente,
      titulo_docente: form.value.titulo_docente,
      nivelEducacion_docente: form.value.nivelEducacion_docente,
      promedio_docente: 0,
    };

    this._usuariosService.agregarDocente(docente).subscribe(data => {
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
    modalRef.closed.subscribe(data => {
      this.router.navigate(['/home']);
  
    })
    modalRef.componentInstance.docente = true;

  
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