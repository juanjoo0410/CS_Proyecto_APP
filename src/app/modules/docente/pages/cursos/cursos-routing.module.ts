import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CursosComponent } from './cursos.component';
import { CursoComponent } from './curso/curso.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { CalificacionesComponent } from './calificaciones/calificaciones.component';
import { AsistenciasComponent } from './asistencias/asistencias.component';
import { ParticipantesComponent } from 'src/app/modules/estudiante/pages/participantes/participantes.component';

const routes: Routes = [
  {
    path: '',
    component: CursosComponent,
  },
  {
    path: ':curso',
    component: CursoComponent,
    children: [
      {
        path: 'actividades',
        component: ActividadesComponent,
      },
      {
        path: 'calificaciones',
        component: CalificacionesComponent,
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
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CursosRoutingModule { }
