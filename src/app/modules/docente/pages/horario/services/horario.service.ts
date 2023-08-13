import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class horarioServiceDocente {

  constructor(private http: HttpClient) { }

  obtenerHorarios(id : number): Observable<any> {    
    const post = {
      docente_curso: id
    };
    const url = `${environment.urlBAse}${environment.pathUrl.urlObtenerHorariosporId}`;    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',        
        'Access-Control-Allow-Origin': '*'
      })
    }    
    return this.http.post(url, post,httpOptions);
  }  

  obtenerHorariosDocente(id : number): Observable<any> {    
    const post = {
      docente_curso: id
    };
    const url = `${environment.urlBAse}${environment.pathUrl.urlObtenerHorariosporIdDocente}`;    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',        
        'Access-Control-Allow-Origin': '*'
      })
    }    
    return this.http.post(url, post,httpOptions);
  }  
}
