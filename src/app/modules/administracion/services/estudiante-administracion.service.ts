import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EstudianteAdministracionService {

  constructor(private http: HttpClient) { }

  obtenerTopEstudiantes(id : string): Observable<any> {  
    const post = {
      ciclo_matricula: id
    }; 
    const url = `${environment.urlBAse}${environment.pathUrl.urlEstudianteAdmin.obtenerTopEstudiantes}`;    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',        
        'Access-Control-Allow-Origin': '*'
      })
    }
    return this.http.post(url, post,httpOptions);
  }
  
  obtenerEstudiantes(): Observable<any> {    
    const url = `${environment.urlBAse}${environment.pathUrl.urlEstudianteAdmin.obtenerEstudiantes}`;    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',        
        'Access-Control-Allow-Origin': '*'
      })
    }    
    return this.http.get(url, httpOptions);
  }
  
  obtenerMateriasEstudiantes(id : number): Observable<any> {   
    const post = {
      estudiante_matricula: id
    }; 
    const url = `${environment.urlBAse}${environment.pathUrl.urlEstudianteAdmin.obtenerMateriasEstudiantes}`;    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',        
        'Access-Control-Allow-Origin': '*'
      })
    }    
    return this.http.post(url, post,httpOptions);
  }

  obtenerEntregasEstudiantes(estado : string, curso: number, estudiante: number): Observable<any> {   
    const post = {
      curso_actividad: curso,
      estudiante_entrega: estudiante,
      estado_entrega: estado
    }; 
    const url = `${environment.urlBAse}${environment.pathUrl.urlEstudianteAdmin.obtenerEntregasEstudiantes}`;    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',        
        'Access-Control-Allow-Origin': '*'
      })
    }    
    return this.http.post(url, post,httpOptions);
  }

  obtenerUsuario(): Observable<any> {    
    const url = `${environment.urlBAse}${environment.pathUrl.urlObtenerUsuarios}`;    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',        
        'Access-Control-Allow-Origin': '*'
      })
    }    
    return this.http.get(url, httpOptions);
  }
}
