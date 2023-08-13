import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministracionComponent } from './administracion.component';
import { AdminPerfilComponent } from './pages/admin-perfil/admin-perfil.component';
import { DocenteAdministracionComponent } from './pages/docente-administracion/docente-administracion.component';
import { EstudianteAdministracionComponent } from './pages/estudiante-administracion/estudiante-administracion.component';
import { PagosDocenteAdministracionComponent } from './pages/pagos-docente-administracion/pagos-docente-administracion.component';
import { VerDocenteAdministracionComponent } from './pages/ver-docente-administracion/ver-docente-administracion.component';
import { VerEstudianteAdministracionComponent } from './pages/ver-estudiante-administracion/ver-estudiante-administracion.component';


const routes: Routes = [
  {
    path: '',
    component: AdministracionComponent
  },
  {
    path: 'administracion',
    component: AdministracionComponent
  },
  { 
    path: 'docente-administracion', 
    component: DocenteAdministracionComponent,
    // canActivate: [LoginGuardian]
  },
  { 
    path: 'estudiante-administracion', 
    component: EstudianteAdministracionComponent,
    // canActivate: [LoginGuardian]
  },
  { 
    path: 'pagos-docente-administracion', 
    component: PagosDocenteAdministracionComponent,
  },
  { 
    path: 'ver-docente-administracion', 
    component: VerDocenteAdministracionComponent,
  },
  { 
    path: 'ver-estudiante-administracion', 
    component: VerEstudianteAdministracionComponent,
  },
  { 
    path: 'perfil', 
    component: AdminPerfilComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
