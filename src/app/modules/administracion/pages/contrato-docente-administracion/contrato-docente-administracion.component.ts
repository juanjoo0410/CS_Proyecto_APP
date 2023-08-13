import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Docente } from '../../models/docenteModel';
import { DocenteAdministracionService } from '../../services/docente-administracion.service';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogExitoComponent } from '../../components/dialog-exito/dialog-exito.component';


@Component({
  selector: 'app-contrato-docente-administracion',
  templateUrl: './contrato-docente-administracion.component.html',
  styleUrls: ['./contrato-docente-administracion.component.css']
})
export class ContratoDocenteAdministracionComponent implements OnInit {
  docente: Docente = {
    id_docente: 0,
    cedula_docente: '',
    nombresCompletos_docente: '',
    ciclo_contrato: '',
    estado_docente: '',
    tipo_contrato: ''
  };
  formulario!: FormGroup;

  id_docente: Number = 0;
  nombre_docente: string = '';

  submitted = false;

  constructor(
    private fb: FormBuilder,
  
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { id_docente: number, nombre_docente: string },
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private docenteService: DocenteAdministracionService,
    private dialogRef: MatDialogRef<ContratoDocenteAdministracionComponent>) {
    
    this.id_docente = data.id_docente;
    this.nombre_docente = data.nombre_docente;

    this.formulario = this.formBuilder.group({
      nombramiento_contrato: ['', [Validators.required]],
      especialidad_contrato: ['', Validators.required],
      tipo_contrato: ['', Validators.required],
      jornada_contrato: ['', Validators.required]
    },
      {
        validators: [],
        updateOn: 'submit'
      }
    );
  }

  ngOnInit(): void {

  }

  enviar() {
    var contrato = {
      docente_contrato: 46,
      fecha_contrato: "2023-03-09",
      nombramiento_contrato: 'Si',
      especialidad_contrato: 'Si',
      tipo_contrato: 'Docente titular',
      jornada_contrato: 'Tiempo Completo',
      sueldo_contrato: 1200
    }

    this.docenteService.agregarContratoDocentes(contrato).subscribe(data => {
      
      this.dialogRef.close();

      this.dialog.open(DialogExitoComponent, { disableClose: true });

    })
  }

  cerrar() {

    this.dialogRef.close();
  }

  filtro: string[] = [
    'Medio Tiempo',
    'Tiempo Completo',
  ];

  tipo: string[] = [
    'Docente titular',
    'Técnico Docente',
  ];

}
