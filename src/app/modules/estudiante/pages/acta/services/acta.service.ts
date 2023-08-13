import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActaService {

  constructor(private http: HttpClient) { }

  obtenerEstudianteItemActa(estudiante_itemacta: number): Observable<any> {    
    const post = {
      estudiante_itemacta
    };
    const url = `${environment.urlBAse}${environment.pathUrl.urlObtenerActaEstudiante}`;    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',        
        'Access-Control-Allow-Origin': '*'
      })
    }    
    return this.http.post(url, post,httpOptions);
  }
}
