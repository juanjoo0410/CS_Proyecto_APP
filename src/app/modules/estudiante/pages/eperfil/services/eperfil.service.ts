import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EPerfilService {

  constructor(private http: HttpClient) { }

 

  obtenerDatosEstudiante(id: number): Observable<any> {    
    const url = `${environment.urlBAse}/api/v1/usuarios/getUsersCompleteData/${id}`;      
    return this.http.get(url);
  }


  obtenerItemMatricula(estudiante_matricula: number): Observable<any> {    
    const post = {
      estudiante_matricula
    };
    const url = `${environment.urlBAse}${environment.pathUrl.urlObtenerItemMatricula}`;    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',        
        'Access-Control-Allow-Origin': '*'
      })
    }    
    return this.http.post(url, post,httpOptions);
  }


  obtenerOrdenPago(matricula_pagoMatricula: number): Observable<any> {    
    const post = {
      matricula_pagoMatricula
    };
    const url = `${environment.urlBAse}${environment.pathUrl.urlObtenerOrdenPago}`;    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',        
        'Access-Control-Allow-Origin': '*'
      })
    }    
    return this.http.post(url, post,httpOptions);
  }
}
