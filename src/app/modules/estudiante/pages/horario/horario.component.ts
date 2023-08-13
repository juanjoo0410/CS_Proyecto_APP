import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Horario } from '../../models/Horario.model';
import { horarioService } from './services/horario.service';
import { Horario2 } from '../../models/Horario2.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent {

  displayedColumns = ['nombre_materia', 'modulo_materia', 'nombre_paralelo', 'docente_curso', 'dia_horario1', 'dia_horario2', 'dia_horario3', 'dia_horario4', 'dia_horario5', 'dia_horario6', 'dia_horario7'];
  dataSource: any = [];
  horario!: Horario[];
  horario2: Horario2[] = [];
  id = JSON.parse(localStorage.getItem("Usuario")!).id_usuario;

  constructor(
    private horarioService: horarioService, 
    private autentificar: AuthService) { }

  ngOnInit() {
    let id_estudiante: number = 0;
    this.autentificar.obtenerDatosCompletos(this.id).subscribe(resp => {      
      id_estudiante = resp.data[0].id_estudiante;
      let nombre_materia = ["s"]      
      this.horarioService.obtenerHorarios(id_estudiante).subscribe(data => {
        this.horario = data.data;
        nombre_materia = []
        for (let i = 0; i < this.horario.length; i++) {
          nombre_materia.push(this.horario[i].nombre_materia);
        }
        let arregloSinRepetidos = nombre_materia.filter((valor, indice) => {
          return nombre_materia.indexOf(valor) === indice;
        });
        
        for (let i = 0; i < arregloSinRepetidos.length; i++) {
          const Horario_Ordenado: Horario2 = {
            nombre_materia: arregloSinRepetidos[i],
            modulo_materia: 0,
            nombre_paralelo: '',
            docente_curso: '',
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

          this.horario2.push(Horario_Ordenado);
        }
        for (let i = 0; i < this.horario.length; i++) {
          for (let j = 0; j < this.horario2.length; j++) {
            if (this.horario[i].nombre_materia == this.horario2[j].nombre_materia) {
              this.horario2[j].modulo_materia = this.horario[i].modulo_materia;
              this.horario2[j].nombre_paralelo = this.horario[i].nombre_paralelo;
              this.horario2[j].docente_curso = this.horario[i].docente_curso;
              if (this.horario[i].dia_horario == "Lunes") {
                this.horario2[j].horario_ordenado[0].dia_horario = this.horario[i].dia_horario;
                this.horario2[j].horario_ordenado[0].hora_horario = this.horario[i].hora_horario;
              }
              if (this.horario[i].dia_horario == "Martes") {
                this.horario2[j].horario_ordenado[1].dia_horario = this.horario[i].dia_horario;
                this.horario2[j].horario_ordenado[1].hora_horario = this.horario[i].hora_horario;
              }
              if (this.horario[i].dia_horario == "Miércoles") {
                this.horario2[j].horario_ordenado[2].dia_horario = this.horario[i].dia_horario;
                this.horario2[j].horario_ordenado[2].hora_horario = this.horario[i].hora_horario;
              }
              if (this.horario[i].dia_horario == "Jueves") {
                this.horario2[j].horario_ordenado[3].dia_horario = this.horario[i].dia_horario;
                this.horario2[j].horario_ordenado[3].hora_horario = this.horario[i].hora_horario;
              }
              if (this.horario[i].dia_horario == "Viernes") {
                this.horario2[j].horario_ordenado[4].dia_horario = this.horario[i].dia_horario;
                this.horario2[j].horario_ordenado[4].hora_horario = this.horario[i].hora_horario;
              }
              if (this.horario[i].dia_horario == "Sábado") {
                this.horario2[j].horario_ordenado[5].dia_horario = this.horario[i].dia_horario;
                this.horario2[j].horario_ordenado[5].hora_horario = this.horario[i].hora_horario;
              }
              if (this.horario[i].dia_horario == "Domingo") {
                this.horario2[j].horario_ordenado[6].dia_horario = this.horario[i].dia_horario;
                this.horario2[j].horario_ordenado[6].hora_horario = this.horario[i].hora_horario;
              }
            }
          }
        }        
        this.dataSource = new MatTableDataSource<Horario2>(this.horario2);
      })
    })
  }
}
