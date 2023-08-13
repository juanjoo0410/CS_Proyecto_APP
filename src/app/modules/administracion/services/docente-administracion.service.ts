import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Contrato } from '../models/contrato';

@Injectable({
  providedIn: 'root'
})
export class DocenteAdministracionService {
  private update: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  obtenerTopDocentes(id : string): Observable<any> {  
    const post = {
      ciclo_contrato: id
    }; 
    const url = `${environment.urlBAse}${environment.pathUrl.urlDocenteAdmin.obtenerTopDocentes}`;    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',        
        'Access-Control-Allow-Origin': '*'
      })
    }
    return this.http.post(url, post,httpOptions);
  }

  obtenerDocentes(): Observable<any> {    
    const url = `${environment.urlBAse}${environment.pathUrl.urlDocenteAdmin.obtenerDocentes}`;    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',        
        'Access-Control-Allow-Origin': '*'
      })
    }    
    return this.http.get(url, httpOptions);
  }

  obtenerPagoDocentes(): Observable<any> {    
    const url = `${environment.urlBAse}${environment.pathUrl.urlDocenteAdmin.obtenerPagoDocentes}`;    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',        
        'Access-Control-Allow-Origin': '*'
      })
    }    
    return this.http.get(url, httpOptions);
  }

  obtenerEvaluacionesDocentes(id : number): Observable<any> {   
    const post = {
      docente_curso: id
    }; 
    const url = `${environment.urlBAse}${environment.pathUrl.urlDocenteAdmin.obtenerEvaluacionesDocente}`;    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',        
        'Access-Control-Allow-Origin': '*'
      })
    }    
    return this.http.post(url, post,httpOptions);
  }

  agregarContratoDocentes(contrato : Contrato): Observable<any> {   
    const body = {
      docente_contrato: contrato.docente_contrato,
      fecha_contrato: contrato.fecha_contrato,
      nombramiento_contrato: contrato.nombramiento_contrato,
      especialidad_contrato: contrato.especialidad_contrato,
      tipo_contrato: contrato.tipo_contrato,
      jornada_contrato: contrato.jornada_contrato,
      sueldo_contrato: contrato.sueldo_contrato
    }; 
    const url = `${environment.urlBAse}${environment.pathUrl.urlDocenteAdmin.agregarContratoDocente}`;    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    }
    return this.http.post(url, body, httpOptions);
  }  
}
