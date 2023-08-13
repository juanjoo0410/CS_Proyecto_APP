import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstudianteComponent } from './estudiante.component';
import { ActaComponent } from './pages/acta/acta.component';
import { CursosComponent } from './pages/cursos/cursos.component';
import { EperfilComponent } from './pages/eperfil/eperfil.component';
import { EstudianteRegistroComponent } from './pages/estudiante-registro/estudiante-registro.component';
import { EvaluacionDocenteComponent } from './pages/evaluacion-docente/evaluacion-docente.component';
import { HorarioComponent } from './pages/horario/horario.component';
import { MateriaComponent } from './pages/materia/materia.component';
import { MatriculacionComponent } from './pages/matriculacion/matriculacion.component';
import { VistaActividadComponent } from './pages/vista-actividad/vista-actividad.component';


const routes: Routes = [
  { 
    path: '', 
    component: EstudianteComponent
  },
  { 
    path: 'acta-calificaciones', 
    component: ActaComponent
  },
  { 
    path: 'perfil', 
    component: EperfilComponent
  },
  { 
    path: 'cursos',  children: [
      { path: '', component: CursosComponent },
      { path: ':materia', component: MateriaComponent },
    ],
  },
  { 
    path: 'evaluacion-docente', 
    component: EvaluacionDocenteComponent
  },
  { 
    path: 'vista-actividad', 
    component: VistaActividadComponent
  },
  { 
    path: 'registro-estudiante', 
    component: EstudianteRegistroComponent
  },
  { 
    path: 'horario', 
    component: HorarioComponent
  },
  { 
    path: 'matriculacion', 
    component: MatriculacionComponent
  },
 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstudianteRoutingModule { }
