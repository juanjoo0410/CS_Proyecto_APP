import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalidadComponent } from './calidad.component';
import { AseguramientoComponent } from './pages/aseguramiento/aseguramiento.component';
import { DimensionComponent } from './pages/dimension/dimension.component';
import { GestionComponent } from './pages/gestion/gestion.component';
import { HerramientasComponent } from './pages/herramientas/herramientas.component';
import { NormasIsoComponent } from './pages/normas-iso/normas-iso.component';


const routes: Routes = [
  { 
    path: '', 
    component: CalidadComponent
  },
  { 
    path: 'aseguramiento', 
    component: AseguramientoComponent
  },
  { 
    path: 'dimension', 
    component: DimensionComponent
  },
  { 
    path: 'gestion', 
    component: GestionComponent
  },
  { 
    path: 'herramientas', 
    component: HerramientasComponent
  },
  { 
    path: 'normas-iso', 
    component: NormasIsoComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalidadRoutingModule { }
