import { Injectable } from '@angular/core';
import { ItemMatricula } from 'src/app/modules/estudiante/models/itemmatricula.model';
import { EPerfilService } from 'src/app/modules/estudiante/pages/eperfil/services/eperfil.service';
import { DatosUser } from '../interfaces/datosSimplesUser.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {  
  usuario = 'User';
  promedio = 0;
  id = 0;
  datosUsuario: DatosUser[] = [];
  matricula: ItemMatricula[] = [];
  constructor(
    private autentificar: AuthService,
    private ePerfil: EPerfilService,) { }
  
  getLoggedUsername(): string {
    return JSON.parse(localStorage.getItem("Usuario")!).nombre_usuario;
  }

  getLoggedUserId(): number {
    return Number(JSON.parse(localStorage.getItem("Usuario")!).id_usuario);
  }

  async login(user: string, contrasena: string): Promise<boolean>{    
    let existe: boolean;
    let existeComprobar: boolean = false;
    await this.autentificar.verificarUsuarioPassword(user, contrasena).toPromise().then( async resp =>{      
      existe = resp.data.existe;        
      if(existe){        
        await this.autentificar.obtenerDatosSimplesUsuario(user).toPromise().then( async resp =>{   
          var usuario = {
            id_usuario: resp.data[0].id_usuario,
            nombre_usuario: resp.data[0].nombre_usuario,
            rol_usuario: resp.data[0].rol_usuario,
          }
          this.id = resp.data[0].rol_usuario;
          localStorage.setItem('Usuario', JSON.stringify(usuario));         
          if(resp.data[0].rol_usuario == 1){            
            await this.autentificar.obtenerDatosCompletos(resp.data[0].id_usuario.toString()).toPromise().then( async resp =>{
              await this.ePerfil.obtenerItemMatricula(resp.data[0].id_estudiante).toPromise().then( data =>{
                this.matricula = data.data;                
                if(this.matricula.length>0){
                  localStorage.setItem('alumno', "true");         
                }else{                  
                  localStorage.setItem('alumno', "false");         
                }
                
                }).catch(err =>{
                  console.error(err);
                });
              }).catch(err =>{
                console.error(err);
              });
          }          
        });        
        existeComprobar = true;        
        return true;
      }else{
        this.id = 0;
        return false;
      }
    }).catch(
      err => {
        console.error(err);
        return false;
      }
    );     
    return existeComprobar;         
  }

  logout(): void {    
    localStorage.removeItem('Usuario');
    localStorage.removeItem('alumno');
    window.open('/home', '_self');
  }

  returnId(): number{
    return this.id;
  }
}
