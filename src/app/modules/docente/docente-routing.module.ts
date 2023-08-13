import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EperfilComponent } from '../estudiante/pages/eperfil/eperfil.component';
import { ParticipantesComponent } from '../estudiante/pages/participantes/participantes.component';
import { DocenteComponent } from './docente.component';
import { ActaComponent } from './pages/acta/acta.component';
import { ActividadesComponent } from './pages/cursos/actividades/actividades.component';
import { AsistenciasComponent } from './pages/cursos/asistencias/asistencias.component';
import { CalificacionesComponent } from './pages/cursos/calificaciones/calificaciones.component';
import { CursoComponent } from './pages/cursos/curso/curso.component';
import { CursosComponent } from './pages/cursos/cursos.component';
import { CursosModule } from './pages/cursos/cursos.module';
import { DperfilComponent } from './pages/dperfil/dperfil.component';
import { HorarioComponent } from './pages/horario/horario.component';


const routes: Routes = [
  {
    path: '',
    component: DocenteComponent
  },
  {
    path: 'acta-calificaciones',
    component: ActaComponent
  },
  {
    path: 'perfilDocente',
    component: DperfilComponent
  },
  {
    path: 'cursos',
    children: [
      {
        path: '',
        component: CursosComponent
      },
      
      {
        path: ':curso',
        component: CursoComponent,
        children: [
          {
            path: 'actividades',
            component: ActividadesComponent
          },
          {
            path: 'calificaciones',
            component: CalificacionesComponent
          },
          {
            path: 'asistencias',
            component: AsistenciasComponent
          },
          {
            path: 'participantes',
            component: ParticipantesComponent
          }
          
        ]
      }
    ]
  },
  {
    path: 'horario',
    component: HorarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocenteRoutingModule { }
