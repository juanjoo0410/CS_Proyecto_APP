import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DocenteModel } from '../models/docenteModel';
import { EstudianteModel } from '../models/estudianteModel';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private update: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  agregarDocente(docente: DocenteModel): Observable<any> {    
    const post = {
      nombre_usuario: docente.nombre_usuario,
      contrasena_usuario: docente.contrasena_usuario,
      rol_usuario: docente.rol_usuario,
      nombres_docente: docente.nombres_docente,
      apellidos_docente: docente.apellidos_docente,
      cedula_docente: docente.cedula_docente,
      fechaNacimiento_docente: docente.fechaNacimiento_docente,
      edad_docente: docente.edad_docente,
      direccion_docente: docente.direccion_docente,
      telefono_docente: docente.telefono_docente,
      email_docente: docente.email_docente,
      titulo_docente: docente.titulo_docente,
      nivelEducacion_docente: docente.nivelEducacion_docente,
      promedio_docente: docente.promedio_docente
    };
    const url = `${environment.urlBAse}${environment.pathUrl.urlAgregarDocente}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    }
    return this.http.post(url, post, httpOptions);
  }

  agregarEstudiante(estudiante: EstudianteModel): Observable<any> {    
    const post = {
      nombre_usuario: estudiante.nombre_usuario,
      contrasena_usuario: estudiante.contrasena_usuario,
      rol_usuario: estudiante.rol_usuario,
      nombres_estudiante: estudiante.nombres_estudiante,
      apellidos_estudiante: estudiante.apellidos_estudiante,
      cedula_estudiante: estudiante.cedula_estudiante,
      fechaNacimiento_estudiante: estudiante.fechaNacimiento_estudiante,
      edad_estudiante: estudiante.edad_estudiante,
      direccion_estudiante: estudiante.direccion_estudiante,
      telefono_estudiante: estudiante.telefono_estudiante,
      email_estudiante: estudiante.email_estudiante,
      nivelEducacion_estudiante: estudiante.nivelEducacion_estudiante,
      promedioAnterior_estudiante: estudiante.promedioAnterior_estudiante,
      medio_estudiante: estudiante.medio_estudiante,
    };
    const url = `${environment.urlBAse}${environment.pathUrl.urlAgregarEstudiante}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    }  
    return this.http.post(url, post, httpOptions);
  }
  


}
