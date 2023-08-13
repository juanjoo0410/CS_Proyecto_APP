import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstudianteRoutingModule } from './estudiante-routing.module';
import { EstudianteComponent } from './estudiante.component';
import { EvaluacionDocenteComponent } from './pages/evaluacion-docente/evaluacion-docente.component';
import { EvaluacionDocenteRoutingModule } from './pages/evaluacion-docente/evaluacion-docente-routing.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActaComponent } from './pages/acta/acta.component';
import { EperfilComponent } from './pages/eperfil/eperfil.component';
import { CursosComponent } from './pages/cursos/cursos.component';
import { MateriaComponent } from './pages/materia/materia.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HorarioComponent } from './pages/horario/horario.component';
import { MatriculacionComponent } from './pages/matriculacion/matriculacion.component';
import { AsistenciasComponent } from './pages/asistencias/asistencias.component';
import { ParticipantesComponent } from './pages/participantes/participantes.component';
import { VistaActividadComponent } from './pages/vista-actividad/vista-actividad.component';
import { MatriculacionModule } from './pages/matriculacion/matriculacion.module';
import { GenerandoModalComponent } from './pages/matriculacion/generando-modal/generando-modal.component';
import { RegistrarModalComponent } from './pages/evaluacion-docente/registrar-modal/registrar-modal.component';


@NgModule({
  declarations: [
    EstudianteComponent,
    EvaluacionDocenteComponent,
    ActaComponent,
    EperfilComponent,
    CursosComponent,
    MateriaComponent,
    HorarioComponent,
    MatriculacionComponent,
    AsistenciasComponent,
    ParticipantesComponent,
    VistaActividadComponent,
    GenerandoModalComponent,
    RegistrarModalComponent
  ],
  imports: [
    CommonModule,
    EstudianteRoutingModule,
    EvaluacionDocenteRoutingModule,
    MatExpansionModule,
    MatTableModule,
    SharedModule,
    MatriculacionModule,    
  ],
  exports: [
    EperfilComponent
  ],
})
export class EstudianteModule { }
