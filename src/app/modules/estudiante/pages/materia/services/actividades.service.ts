import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActividadesModel } from '../../../models/actividadesModel';
import { UpdateEntregaModel } from '../../../models/updateEntrega';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {
  public presentarEdicion: boolean = true; 
  private update: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { }

  obtenerActividades(curso_actividad: number): Observable<any> {    
    const post = {
      curso_actividad: curso_actividad
    };
    const url = `${environment.urlBAse}${environment.pathUrl.urlObtenerActividades}`;    
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

  obtenerEntregas(): Observable<any> {    
    const url = `${environment.urlBAse}/api/v1/entregas/getEntregas`;      
    return this.http.get(url);
  }

  modificarEntrega(entrega : UpdateEntregaModel): Observable<any> {    
    const body = {
      id_entrega: entrega.id_entrega,
      fechaEnvio_entrega: entrega.fechaEnvio_entrega,
      fechaModificacion_entrega: entrega.fechaModificacion_entrega,
      archivo_entrega: entrega.archivo_entrega,
      estado_entrega: entrega.estado_entrega,
    };
    const url = `${environment.urlBAse}${environment.pathUrl.urlModificarEntrega}`;    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',        
        'Access-Control-Allow-Origin': '*'
      })
    }
    return this.http.post(url, body, httpOptions);
  }

  public sendUpdate(value: boolean): void {
    this.update.next(value);
  }
}
