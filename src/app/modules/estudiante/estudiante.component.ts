import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginService } from 'src/app/core/services/login.service';
import { ItemMatricula } from './models/itemmatricula.model';
import { EPerfilService } from './pages/eperfil/services/eperfil.service';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit {
  id = JSON.parse(localStorage.getItem("Usuario")!)?.id_usuario;
  rol = JSON.parse(localStorage.getItem("Usuario")!)?.rol_usuario;
  validarMatricula: boolean = true;
  matricula: ItemMatricula[] = [];
  constructor(
    private loginService: LoginService,
    private ePerfil: EPerfilService,
    private autentificar: AuthService
    ){

  }

 ngOnInit(): void {
  let id_estudiante: number = 0;
  
  if(this.rol != 1){    
    this.validarMatricula = false;
  }
  this.autentificar.obtenerDatosCompletos(this.id).toPromise().then( resp =>{
    id_estudiante = resp.data[0].id_estudiante;    
    this.ePerfil.obtenerItemMatricula(id_estudiante).toPromise().then( data =>{
      this.matricula = data.data;      
      if(this.matricula.length>0){        
        if(this.matricula[0].ciclo_matricula == '2023-2024 CI' || this.matricula[0].ciclo_matricula == '2022-2023 CII'){
          this.validarMatricula = false;
        }             
      }
      }).catch(err =>{
        console.error(err);
      });
    }).catch(err =>{
      console.error(err);
    });    
  }
}
