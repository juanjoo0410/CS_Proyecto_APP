import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsuarioModule } from 'src/app/modules/usuario/usuario.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UsuarioModule
  ],
  declarations: [
    LoginComponent,    
  ],
  providers: [],
})
export class AutenticacionModule { }
