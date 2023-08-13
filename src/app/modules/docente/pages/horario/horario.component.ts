import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/core/services/auth.service';
import { HorarioDocente } from '../../interfaces/horarioDocente.interface';
import { HorarioDocenteTabla } from '../../interfaces/horarioDocenteTabla.interface';
import { horarioServiceDocente } from './services/horario.service';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {
  id = JSON.parse(localStorage.getItem("Usuario")!).id_usuario;
  horarioDocente: HorarioDocente[] = [];
  horarioDocenteTabla: HorarioDocenteTabla[] = [];
  displayedColumns = ['nombre_materia', 'modulo_materia', 'nombre_paralelo', 'dia_horario1', 'dia_horario2', 'dia_horario3', 'dia_horario4', 'dia_horario5', 'dia_horario6', 'dia_horario7'];
  dataSource: any = [];
  constructor(
    private horarioService: horarioServiceDocente,
    private autentificar: AuthService) {

  }

  ngOnInit(): void {
    let id_curso = [0]
    let id_docente: number = 0;
    this.autentificar.obtenerDatosCompletos(this.id.toString()).subscribe(resp => {
      id_docente = resp.data[0].id_docente;
      this.horarioService.obtenerHorariosDocente(id_docente).toPromise().then(resp => {        
        this.horarioDocente = resp.data;
        id_curso = []
        for (let i = 0; i < this.horarioDocente.length; i++) {
          id_curso.push(this.horarioDocente[i].id_curso);
        }
        let arregloSinRepetidos = id_curso.filter((valor, indice) => {
          return id_curso.indexOf(valor) === indice;
        });        

        for (let i = 0; i < arregloSinRepetidos.length; i++) {
          const Horario_Ordenado: HorarioDocenteTabla = {
            id_curso: arregloSinRepetidos[i],
            modulo_materia: 0,
            nombre_materia: '',
            nombre_paralelo: '',
            horario_ordenado: [
              {
                dia_horario: "",
                hora_horario: ""
              },
              {
                dia_horario: "",
                hora_horario: ""
              },
              {
                dia_horario: "",
                hora_horario: ""
              },
              {
                dia_horario: "",
                hora_horario: ""
              },
              {
                dia_horario: "",
                hora_horario: ""
              },
              {
                dia_horario: "",
                hora_horario: ""
              },
              {
                dia_horario: "",
                hora_horario: ""
              }
            ]
          };
          this.horarioDocenteTabla.push(Horario_Ordenado);
        }
        for (let i = 0; i < this.horarioDocente.length; i++) {
          for (let j = 0; j < this.horarioDocenteTabla.length; j++) {
            if (this.horarioDocente[i].id_curso == this.horarioDocenteTabla[j].id_curso) {
              this.horarioDocenteTabla[j].modulo_materia = this.horarioDocente[i].modulo_materia;
              this.horarioDocenteTabla[j].nombre_paralelo = this.horarioDocente[i].nombre_paralelo;
              this.horarioDocenteTabla[j].nombre_materia = this.horarioDocente[i].nombre_materia;
              if (this.horarioDocente[i].dia_horario == "Lunes") {
                this.horarioDocenteTabla[j].horario_ordenado[0].dia_horario = this.horarioDocente[i].dia_horario;
                this.horarioDocenteTabla[j].horario_ordenado[0].hora_horario = this.horarioDocente[i].hora_horario;
              }
              if (this.horarioDocente[i].dia_horario == "Martes") {
                this.horarioDocenteTabla[j].horario_ordenado[1].dia_horario = this.horarioDocente[i].dia_horario;
                this.horarioDocenteTabla[j].horario_ordenado[1].hora_horario = this.horarioDocente[i].hora_horario;
              }
              if (this.horarioDocente[i].dia_horario == "Miércoles") {
                this.horarioDocenteTabla[j].horario_ordenado[2].dia_horario = this.horarioDocente[i].dia_horario;
                this.horarioDocenteTabla[j].horario_ordenado[2].hora_horario = this.horarioDocente[i].hora_horario;
              }
              if (this.horarioDocente[i].dia_horario == "Jueves") {
                this.horarioDocenteTabla[j].horario_ordenado[3].dia_horario = this.horarioDocente[i].dia_horario;
                this.horarioDocenteTabla[j].horario_ordenado[3].hora_horario = this.horarioDocente[i].hora_horario;
              }
              if (this.horarioDocente[i].dia_horario == "Viernes") {
                this.horarioDocenteTabla[j].horario_ordenado[4].dia_horario = this.horarioDocente[i].dia_horario;
                this.horarioDocenteTabla[j].horario_ordenado[4].hora_horario = this.horarioDocente[i].hora_horario;
              }
              if (this.horarioDocente[i].dia_horario == "Sábado") {
                this.horarioDocenteTabla[j].horario_ordenado[5].dia_horario = this.horarioDocente[i].dia_horario;
                this.horarioDocenteTabla[j].horario_ordenado[5].hora_horario = this.horarioDocente[i].hora_horario;
              }
              if (this.horarioDocente[i].dia_horario == "Domingo") {
                this.horarioDocenteTabla[j].horario_ordenado[6].dia_horario = this.horarioDocente[i].dia_horario;
                this.horarioDocenteTabla[j].horario_ordenado[6].hora_horario = this.horarioDocente[i].hora_horario;
              }
            }


          }
        }        
        this.dataSource = new MatTableDataSource<HorarioDocenteTabla>(this.horarioDocenteTabla);
      }).catch(
        err => {
          console.error(err);
        }
      );

    });

  }
}
