import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { MiCuentaComponent } from './pages/mi-cuenta/mi-cuenta.component';
import { RegistroUsuarioComponent } from './pages/registro-usuario/registro-usuario.component';
import { AngularMaterialsModule } from 'src/app/shared/angularMaterials/angularMaterials.module';
import { CambiarContrasenaComponent } from './pages/cambiar-contrasena/cambiar-contrasena.component';
import { EstudianteModule } from '../estudiante/estudiante.module';
import { RegistrarEstudianteComponent } from './pages/registrar-estudiante/registrar-estudiante.component';
import { RegistrarDocenteComponent } from './pages/registrar-docente/registrar-docente.component';
import { DocenteModule } from '../docente/docente.module';
import { AdministracionModule } from '../administracion/administracion.module';
import { RegistrarModalComponent } from './pages/registrar-modal/registrar-modal.component';

@NgModule({
  declarations: [
    MiCuentaComponent,
    RegistroUsuarioComponent,
    CambiarContrasenaComponent,
    RegistrarEstudianteComponent,
    RegistrarDocenteComponent,
    RegistrarModalComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    AngularMaterialsModule,
    EstudianteModule,
    DocenteModule,
    AdministracionModule
  
  ],
})
export class UsuarioModule { }
