import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {  

  constructor(private http: HttpClient) { }

  verificarUsuarioPassword(nombre_usuario: string,contrasena_usuario: string): Observable<any> {    
    const post = {
      nombre_usuario,
      contrasena_usuario
    };
    const url = `${environment.urlBAse}${environment.pathUrl.urlVerificarUsuarioPassword}`;    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',        
        'Access-Control-Allow-Origin': '*'
      })
    }    
    return this.http.post(url, post,httpOptions);
  }

  verificarUsuario(nombre_usuario: string): Observable<any> {    
    const post = {
      nombre_usuario
    };
    const url = `${environment.urlBAse}${environment.pathUrl.urlVerificarUsuario}`;    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',        
        'Access-Control-Allow-Origin': '*'
      })
    }    
    return this.http.post(url, post,httpOptions);
  }

  obtenerDatosSimplesUsuario(username : string): Observable<any> {        
    const url = `${environment.urlBAse}${environment.pathUrl.urlObtenerUsuariosPorUser}`;        
    return this.http.get(`${url}/${username}`);
  }

  obtenerDatosCompletos(username : string): Observable<any> {        
    const url = `${environment.urlBAse}${environment.pathUrl.UrlObtenerDatosCompletos}`;         
    return this.http.get(`${url}/${username}`);
  }


}
