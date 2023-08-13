import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipantesService {
  public presentarEdicion: boolean = true; 
  constructor(private http: HttpClient) { }

  ObtenerParticipantes(id_curso: number): Observable<any> {    
    const post = {
      id_curso
        };
    const url = `${environment.urlBAse}${environment.pathUrl.urlDocentes.obtenerParticipantes}`;    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',        
        'Access-Control-Allow-Origin': '*'
      })
    }    
    return this.http.post(url, post,httpOptions);
  }

  

  
}
