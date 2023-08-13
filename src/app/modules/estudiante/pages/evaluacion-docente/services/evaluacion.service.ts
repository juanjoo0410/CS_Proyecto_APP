import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {

  constructor(private http: HttpClient) { }

  obtenerAsistencias(estudiante_asistencia: number): Observable<any> {    
    const post = {
      estudiante_asistencia
    };
    const url = `${environment.urlBAse}${environment.pathUrl.urlObtenerAsistenciasByIdEstudiante}`;    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',        
        'Access-Control-Allow-Origin': '*'
      })
    }    
    return this.http.post(url, post,httpOptions);
  }
  obtenerDatosEstudiante(id: number): Observable<any> {    
    const url = `${environment.urlBAse}/api/v1/usuarios/getUsersCompleteData/${id}`;      
    return this.http.get(url);
  }
}
