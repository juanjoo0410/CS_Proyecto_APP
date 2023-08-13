import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class matriculacionService {

  constructor(private http: HttpClient) { }

  obtenerHorariosmatricula(): Observable<any> {        
    const url = `${environment.urlBAse}${environment.pathUrl.urlObtenerHorariosmatricula}`;    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',        
        'Access-Control-Allow-Origin': '*'
      })
    }    
    return this.http.get(url, httpOptions);
  }  

  obtenercurso(): Observable<any> {    
    const url = `${environment.urlBAse}${environment.pathUrl.UrlObtenerCursos}`;    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',        
        'Access-Control-Allow-Origin': '*'
      })
    }    
    return this.http.get(url, httpOptions);
  }  

  obtenerParalelo(): Observable<any> {    
    const url = `${environment.urlBAse}${environment.pathUrl.UrlObtenerParalelos}`;    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',        
        'Access-Control-Allow-Origin': '*'
      })
    }    
    return this.http.get(url, httpOptions);
  }
 obtenerMaterias(): Observable<any> {    
    const url = `${environment.urlBAse}${environment.pathUrl.UrlObtenerMaterias}`;    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',        
        'Access-Control-Allow-Origin': '*'
      })
    }    
    return this.http.get(url, httpOptions);
  }

  obtenerActaEstudiante(estudiante_itemActa: number): Observable<any> {    
    const post = {
      estudiante_itemActa
    };
    const url = `${environment.urlBAse}${environment.pathUrl.UrlObtenerActaByEstudiante}`;    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',        
        'Access-Control-Allow-Origin': '*'
      })
    }    
    return this.http.post(url, post,httpOptions);
  }

  agregarMatricula(estudiante_matricula: number, fecha_matricula: string | null){
    const post = {
      estudiante_matricula,
      fecha_matricula
    };
    const url = `${environment.urlBAse}${environment.pathUrl.urlMatriculacion.urlAgregarMatricula}`;    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',        
        'Access-Control-Allow-Origin': '*'
      })
    }    
    return this.http.post(url, post,httpOptions);
  }

  agregarItemMatriculas(matricula_itemMatricula?: number, curso_itemMatricula?: number){
    const post = {
      matricula_itemMatricula,
      curso_itemMatricula
    };
    const url = `${environment.urlBAse}${environment.pathUrl.urlMatriculacion.urlAgregarItemMatriculas}`;    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',        
        'Access-Control-Allow-Origin': '*'
      })
    }    
    return this.http.post(url, post,httpOptions);
  }

  agregarOrdenPagoMatriculas(
    matricula_pagoMatricula: number, 
    item_pagoMatricula: string,
    cantidad_pagoMatricula: number,
    subtotal_pagoMatricula: number,
    descuento_pagoMatricula: number,
    total_pagoMatricula: number){
    const post = {
      matricula_pagoMatricula,
      item_pagoMatricula,
      cantidad_pagoMatricula,
      subtotal_pagoMatricula,
      descuento_pagoMatricula,
      total_pagoMatricula
    };    
    const url = `${environment.urlBAse}${environment.pathUrl.urlMatriculacion.urlAgregarOrdenPagoMatriculas}`;    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',        
        'Access-Control-Allow-Origin': '*'
      })
    }    
    return this.http.post(url, post,httpOptions);
  }

  obtenerMatriculas(): Observable<any> {    
    const url = `${environment.urlBAse}${environment.pathUrl.urlMatriculacion.urlObtenerOrdenesPago}`;    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',        
        'Access-Control-Allow-Origin': '*'
      })
    }    
    return this.http.get(url, httpOptions);
  }
}
