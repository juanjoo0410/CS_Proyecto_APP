import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private http: HttpClient) { }

  obtenerCurso(estudiante_matricula: number): Observable<any> {    
    const post = {
      estudiante_matricula
    };
    const url = `${environment.urlBAse}${environment.pathUrl.urlObterCursoEstudiante}`;    
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
