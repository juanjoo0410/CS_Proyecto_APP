import { Component, OnChanges, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { matriculacionService } from './services/matriculacion.service';
import { horarioMatriculacion } from '../../models/horarioMatriculacion.model';
import { CursoHorario } from '../../models/cursoHorario.model';
import { EstudiantePerfil } from '../../models/estudianteperfil.model';
import { Curso } from '../../models/curso.model';
import { paralelo } from '../../models/paralelo.model';
import { Materias } from '../../models/materias.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatTable } from '@angular/material/table';
import { ActaService } from '../acta/services/acta.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActaCalificacion } from '../../models/actacalificacion.model';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { StepperOrientation } from '@angular/cdk/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { GenerandoModalComponent } from '../matriculacion/generando-modal/generando-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { EPerfilService } from '../eperfil/services/eperfil.service';
import { ItemMatricula } from '../../models/itemmatricula.model';

@Component({
  selector: 'app-matriculacion',
  templateUrl: './matriculacion.component.html',
  styleUrls: ['./matriculacion.component.css']
})
export class MatriculacionComponent implements OnChanges {
  @ViewChild(MatTable) table!: MatTable<any>;
  selected = '';
  horarioMatriculacion: horarioMatriculacion[] = [];
  horarioMatriculado: horarioMatriculacion[] = [];
  cursoHorario: CursoHorario[] = [];
  curso: Curso[] = [];
  paralelo: paralelo[] = [];
  materias: Materias[] = [];
  modulo: number = 0;
  seleccionado: number = 0;
  asignaturas: any[] = [];
  asignaturaSeleccionada: string = '';
  id = JSON.parse(localStorage.getItem("Usuario")!).id_usuario;
  datosCompletos: EstudiantePerfil | any = null;
  datosActaCalifiacion: ActaCalificacion[] = [];
  materiasReprobadas: any[] = [];
  materiasAprobadas: any[] = [];
  mostrarHorario: boolean = true;
  mostrarHorario2: boolean = true;
  costoUnitario: number = 86;
  costoTotal: number = 0;
  descuento: number = 0;
  promedio: number = 0;
  totalDescuento: number = 0;
  nombreModulo: string = '';
  fechaActual: string | null= '';
  matricula_pagoMatricula: number = 0;
  
  validarMatricula: boolean = true;
  matricula: ItemMatricula[] = [];

  displayedColumns = ['accion', 'paralelo_curso', 'curso_cupo', 'dia_horario1', 'dia_horario2', 'dia_horario3', 'dia_horario4', 'dia_horario5', 'dia_horario6', 'dia_horario7'];
  displayedColumns2 = ['accion', 'materia', 'paralelo_curso', 'curso_cupo', 'dia_horario1', 'dia_horario2', 'dia_horario3', 'dia_horario4', 'dia_horario5', 'dia_horario6', 'dia_horario7'];
  displayedColumns3 = ['materia', 'paralelo_curso', 'modulo', 'dia_horario1', 'dia_horario2', 'dia_horario3', 'dia_horario4', 'dia_horario5', 'dia_horario6', 'dia_horario7'];
  dataSource: any = [];
  firstFormGroup = this._formBuilder.group({
    select: ['', Validators.required],
    select2: ['', Validators.required],
  });

  tarjetaForm = new FormGroup({
    secondCtrl: new FormControl('', [Validators.required]),
    numero_tarjeta: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(16), Validators.pattern('^[0-9]*$')]),
    nombre_titular: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*$')]),
    fecha: new FormControl('', [Validators.required]),
    cvv: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern('^[0-9]*$')])
  });
  isEditable = true;
  
  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private _formBuilder: FormBuilder,
    private matriculacionService: matriculacionService,
    private autentificar: AuthService,
    private acta: ActaService,
    private ePerfil: EPerfilService,
    private router: Router,
    breakpointObserver: BreakpointObserver,
    private modalService: NgbModal,
    private datePipe: DatePipe
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
      
  }


  ngOnInit() {
    this.validarMatriculacion();
    if (this.validarMatricula){
      const fecha = new Date();
      this.fechaActual = this.datePipe.transform(fecha, 'yyyy-MM-dd');    
      this.matriculacionService.obtenerMatriculas().subscribe(resp =>{
        this.matricula_pagoMatricula = resp.data.length+1;
      });

      this.autentificar.obtenerDatosCompletos(this.id).toPromise().then(resp => {
        this.datosCompletos = resp.data;
        this.promedio = resp.data[0].promedioAnterior_estudiante;
        this.acta.obtenerEstudianteItemActa(this.datosCompletos[0].id_estudiante).toPromise().then(respuesta => {        
          this.datosActaCalifiacion = respuesta.data;
          for (let i = 0; i < this.datosActaCalifiacion.length; i++) {
            if (this.datosActaCalifiacion[i].estado_itemActa != 'APROBADO') {
              this.materiasReprobadas.push(this.datosActaCalifiacion[i].nombre_materia);
            }
            if (this.datosActaCalifiacion[i].estado_itemActa != 'REPROBADO') {
              this.materiasAprobadas.push(this.datosActaCalifiacion[i].nombre_materia);
            }
          }        
        }).catch(
          err => {
            console.error(err);
            return false;
          }
        );

      }).catch(
        err => {
          console.error(err);
          return false;
        }
      );
      this.matriculacionService.obtenerHorariosmatricula().subscribe(data => {
        this.cursoHorario = data.data;      
        this.matriculacionService.obtenercurso().subscribe(data => {
          this.curso = data.data;        
        });
      });
      this.matriculacionService.obtenerParalelo().subscribe(data => {
        this.paralelo = data.data;
      });
    }
  }

  ngOnChanges() {

  }


  onSelect(event: any) {
    this.mostrarHorario = true;
    this.mostrarHorario2 = true;
    this.seleccionado = Number(event.value);    
    let nombre_materia = ["s"]
    this.matriculacionService.obtenerMaterias().subscribe(data => {
      this.materias = data.data;
      nombre_materia = []
      for (let i = 0; i < this.materias.length; i++) {
        if (this.materias[i].modulo_materia == this.seleccionado) {
          nombre_materia.push(this.materias[i].nombre_materia);
        }
      }
      let arregloSinRepetidos = nombre_materia.filter((valor, indice) => {
        return nombre_materia.indexOf(valor) === indice;
      });
      let arreglo2 = arregloSinRepetidos;
      if (this.seleccionado == 1) {
        for (let i = 0; i < this.materiasReprobadas.length; i++) {
          for (let j = 0; j < arregloSinRepetidos.length; j++) {
            if (this.materiasReprobadas[i] != arregloSinRepetidos[j]) {
              arregloSinRepetidos.splice(j, 1); // Elimina la materia en el índice j
              j--; // Disminuye j para que no se salte la materia siguiente
            }
          }
        }
        for (let i = 0; i < this.materiasAprobadas.length; i++) {
          for (let j = 0; j < arregloSinRepetidos.length; j++) {
            if (this.materiasAprobadas[i] == arregloSinRepetidos[j]) {              
              arregloSinRepetidos.splice(j, 1); // Elimina la materia en el índice j
              j--; // Disminuye j para que no se salte la materia siguiente
            }
          }
          this.asignaturas = arregloSinRepetidos;
        }
      } else if (this.seleccionado == 2) {
        if (this.materiasAprobadas.length == 5) {
          this.mostrarHorario2 = true;
          this.asignaturas = arreglo2;
        } else {
          this.mostrarHorario2 = false;
          this.asignaturas = [];
        }
      }
      if (this.asignaturas.length == 0 && this.seleccionado == 1) {
        if (this.materiasAprobadas.length > 0) {
          this.asignaturas = arregloSinRepetidos;
          this.mostrarHorario = false;
        } else {
          this.asignaturas = arregloSinRepetidos;
          this.mostrarHorario = true;
        }
      }
    });
  }

  onSelectMateria(event: any) {
    this.mostrarHorario = true;
    this.mostrarHorario2 = true;
    this.horarioMatriculacion = []
    let cursoHorarioProvicional: CursoHorario[] = [];
    let findElementId
    if (event.value) {
      this.asignaturaSeleccionada = event.value;
      findElementId = this.materias.find(item => item.nombre_materia === this.asignaturaSeleccionada);
    } else {
      this.asignaturaSeleccionada = event.materia;      
      findElementId = this.materias.find(item => item.nombre_materia === this.asignaturaSeleccionada);
    }

    for (let i = 0; i < this.curso.length; i++) {
      if (this.curso[i].materia_curso == findElementId?.id_materia) {
        for (let j = 0; j < this.cursoHorario.length; j++) {
          if (this.curso[i].id_curso == this.cursoHorario[j].curso_horario && this.curso[i].id_curso >= 76 && this.curso[i].id_curso <= 150) {
            cursoHorarioProvicional.push(this.cursoHorario[j])
          }
        }

      }
    }
    let idHorarios: number[] = [];
    for (let i = 0; i < cursoHorarioProvicional.length; i++) {
      idHorarios.push(cursoHorarioProvicional[i].curso_horario);
    }
    let arregloSinRepetidos = idHorarios.filter((valor, indice) => {
      return idHorarios.indexOf(valor) === indice;
    });
    let cursos: number[] = [];
    idHorarios = [];
    for (let i = 0; i < this.curso.length; i++) {
      for (let j = 0; j < cursoHorarioProvicional.length; j++) {
        if (this.curso[i].id_curso == arregloSinRepetidos[j]) {
          cursos.push(this.curso[i].estudiantes_curso);
        }
      }
    }
    
    for (let i = 0; i < arregloSinRepetidos.length; i++) {
      const horarioMatriculacion: horarioMatriculacion = {
        id_curso: arregloSinRepetidos[i],
        materia: findElementId?.nombre_materia,
        paralelo_curso: this.paralelo[i].nombre_paralelo,
        cupo_curso: cursos[i],
        horario_ordenado: [
          {
            dia_horario: '',
            hora: '',
          },
          {
            dia_horario: '',
            hora: '',
          },
          {
            dia_horario: '',
            hora: '',
          },
          {
            dia_horario: '',
            hora: '',
          },
          {
            dia_horario: '',
            hora: '',
          },
          {
            dia_horario: '',
            hora: '',
          },
          {
            dia_horario: '',
            hora: '',
          }
        ]
      };
      this.horarioMatriculacion.push(horarioMatriculacion);
    }


    for (let j = 0; j < this.horarioMatriculacion.length; j++) {
      for (let k = 0; k < cursoHorarioProvicional.length; k++) {
        if (this.horarioMatriculacion[j].id_curso == cursoHorarioProvicional[k].curso_horario) {
          if (cursoHorarioProvicional[k].dia_horario == "Lunes") {
            this.horarioMatriculacion[j].horario_ordenado[0].dia_horario = cursoHorarioProvicional[k].dia_horario;
            this.horarioMatriculacion[j].horario_ordenado[0].hora = cursoHorarioProvicional[k].horaInicio_horario + " - " + cursoHorarioProvicional[k].horaFin_horario;
          }
          if (cursoHorarioProvicional[k].dia_horario == "Martes") {
            this.horarioMatriculacion[j].horario_ordenado[1].dia_horario = cursoHorarioProvicional[k].dia_horario;
            this.horarioMatriculacion[j].horario_ordenado[1].hora = cursoHorarioProvicional[k].horaInicio_horario + " - " + cursoHorarioProvicional[k].horaFin_horario;
          }
          if (cursoHorarioProvicional[k].dia_horario == "Miércoles") {
            this.horarioMatriculacion[j].horario_ordenado[2].dia_horario = cursoHorarioProvicional[k].dia_horario;
            this.horarioMatriculacion[j].horario_ordenado[2].hora = cursoHorarioProvicional[k].horaInicio_horario + " - " + cursoHorarioProvicional[k].horaFin_horario;
          }
          if (cursoHorarioProvicional[k].dia_horario == "Jueves") {
            this.horarioMatriculacion[j].horario_ordenado[3].dia_horario = cursoHorarioProvicional[k].dia_horario;
            this.horarioMatriculacion[j].horario_ordenado[3].hora = cursoHorarioProvicional[k].horaInicio_horario + " - " + cursoHorarioProvicional[k].horaFin_horario;
          }
          if (cursoHorarioProvicional[k].dia_horario == "Viernes") {
            this.horarioMatriculacion[j].horario_ordenado[4].dia_horario = cursoHorarioProvicional[k].dia_horario;
            this.horarioMatriculacion[j].horario_ordenado[4].hora = cursoHorarioProvicional[k].horaInicio_horario + " - " + cursoHorarioProvicional[k].horaFin_horario;
          }
          if (cursoHorarioProvicional[k].dia_horario == "Sábado") {
            this.horarioMatriculacion[j].horario_ordenado[5].dia_horario = cursoHorarioProvicional[k].dia_horario;
            this.horarioMatriculacion[j].horario_ordenado[5].hora = cursoHorarioProvicional[k].horaInicio_horario + " - " + cursoHorarioProvicional[k].horaFin_horario;
          }
          if (cursoHorarioProvicional[k].dia_horario == "Domingo") {
            this.horarioMatriculacion[j].horario_ordenado[6].dia_horario = cursoHorarioProvicional[k].dia_horario;
            this.horarioMatriculacion[j].horario_ordenado[6].hora = cursoHorarioProvicional[k].horaInicio_horario + " - " + cursoHorarioProvicional[k].horaFin_horario;
          }
        }
      }
    }

  }

  add(event: any) {    
    const horarioMatriculacion: horarioMatriculacion = {
      id_curso: event.id_curso,
      materia: event.materia,
      paralelo_curso: event.paralelo_curso,
      cupo_curso: event.cupo_curso,
      horario_ordenado: [
        {
          dia_horario: event.horario_ordenado[0].dia_horario,
          hora: event.horario_ordenado[0].hora,
        },
        {
          dia_horario: event.horario_ordenado[1].dia_horario,
          hora: event.horario_ordenado[1].hora,
        },
        {
          dia_horario: event.horario_ordenado[2].dia_horario,
          hora: event.horario_ordenado[2].hora,
        },
        {
          dia_horario: event.horario_ordenado[3].dia_horario,
          hora: event.horario_ordenado[3].hora,
        },
        {
          dia_horario: event.horario_ordenado[4].dia_horario,
          hora: event.horario_ordenado[4].hora,
        },
        {
          dia_horario: event.horario_ordenado[5].dia_horario,
          hora: event.horario_ordenado[5].hora,
        },
        {
          dia_horario: event.horario_ordenado[6].dia_horario,
          hora: event.horario_ordenado[6].hora,
        }
      ]
    };
    this.horarioMatriculado = [...this.horarioMatriculado, horarioMatriculacion];
    for (let i = 0; i < this.horarioMatriculado.length; i++) {
      for (let j = 0; j < this.asignaturas.length; j++) {
        if (this.horarioMatriculado[i].materia == this.asignaturas[j]) {
          this.asignaturas.splice(j, 1);
        }
      }
    }    
    this.horarioMatriculacion = [];

    if(this.selected == '1'){
      this.nombreModulo = 'Módulo 1';
    }else{
      this.nombreModulo = 'Módulo 2';
    }

    if(this.promedio < 9){
      this.descuento = 0;
    }else if(this.promedio >= 9 && this.promedio < 9.5){
      this.descuento = 0.10;
    }else if(this.promedio >= 9.5 && this.promedio < 10){
      this.descuento = 0.20;
    }else if(this.promedio == 10){
      this.descuento = 0.30;
    }

    if(this.horarioMatriculado.length == 5 && this.selected == '1'){
      this.costoTotal = 300;        
    }else if(this.horarioMatriculado.length == 5 && this.selected == '2'){      
      this.costoTotal = 400;      
    }else if(this.horarioMatriculado.length != 5){      
      this.costoTotal = this.costoUnitario*this.horarioMatriculado.length;      
    } 
    this.totalDescuento = this.costoTotal-(this.costoTotal*this.descuento);   
    this.descuento = this.descuento * 100;
  }


  delete(event: any) {
    let materia = event;    
    for (let i = 0; i < this.horarioMatriculado.length; i++) {
      if (this.horarioMatriculado[i].materia == materia.materia) {
        this.asignaturas.push(materia.materia);
        this.onSelectMateria(this.horarioMatriculado[i]);
        this.horarioMatriculado.splice(i, 1);
        this.horarioMatriculado = [...this.horarioMatriculado]; // create a new array reference to trigger change detection        
      }
    }
    this.dataSource = new MatTableDataSource<horarioMatriculacion>(this.horarioMatriculacion);
  }

  volver() {
    this.router.navigate(['/estudiante/horario']);
  }

  async finalizar(){
    let id = this.matricula_pagoMatricula;
    let matricula = this.horarioMatriculado    
    // await this.matriculacionService.agregarOrdenPagoMatriculas(
    //   this.matricula_pagoMatricula,
    //   this.nombreModulo,
    //   this.horarioMatriculado.length,
    //   this.costoTotal,
    //   this.descuento,
    //   this.totalDescuento)
    //   .toPromise().then(respuesta =>{    
    // }).catch(err =>{
    //   console.error(err);
    // });

    // await this.matriculacionService.agregarMatricula(
    //   this.datosCompletos[0].id_estudiante,
    //   this.fechaActual)
    //   .toPromise().then(respuesta =>{    
    // }).catch(err =>{
    //   console.error(err);
    // });
    // for(let i = 0;i<matricula.length;i++){
    //   await this.matriculacionService.agregarItemMatriculas(matricula[i].id_curso,id).toPromise().then(respuesta =>{    
    //   }).catch(err =>{
    //     console.error(err);
    //   });
    // }    
    const modalRef = this.modalService.open(GenerandoModalComponent, { centered: true, size: 'md', backdrop: 'static', keyboard: false });
  }

  validarMatriculacion(){
    let id_estudiante: number = 0;
    this.autentificar.obtenerDatosCompletos(this.id).toPromise().then( resp =>{
      id_estudiante = resp.data[0].id_estudiante;    
      this.ePerfil.obtenerItemMatricula(id_estudiante).toPromise().then( data =>{
        this.matricula = data.data;      
        if(this.matricula.length>0){        
          if(this.matricula[0].ciclo_matricula == '2023-2024 CI' || this.matricula[0].ciclo_matricula == '2022-2023 CII'){
            this.validarMatricula = false;
          }             
        }
        }).catch(err =>{
          console.error(err);
        });
      }).catch(err =>{
        console.error(err);
      });    
    }
}
