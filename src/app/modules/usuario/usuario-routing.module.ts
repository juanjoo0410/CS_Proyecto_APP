import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuardian } from 'src/app/core/components/autentificacion/login/loginGuardian';
import { MiCuentaComponent} from './pages/mi-cuenta/mi-cuenta.component';
import { RegistroUsuarioComponent} from './pages/registro-usuario/registro-usuario.component';


const routes: Routes = [
  { 
    path: '', 
    component: MiCuentaComponent,
    // canActivate: [LoginGuardian]
  },
  { 
    path: 'mi-cuenta', 
    component: MiCuentaComponent,
    // canActivate: [LoginGuardian]
  },
  { 
    path: 'registro-usuario', 
    component: RegistroUsuarioComponent,
    // canActivate: [LoginGuardian]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
