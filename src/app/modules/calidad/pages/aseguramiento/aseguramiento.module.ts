import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AseguramientoRoutingModule } from './aseguramiento-routing.module';
import { AseguramientoComponent } from './aseguramiento.component';


@NgModule({
  declarations: [
    AseguramientoComponent
  ],
  imports: [
    CommonModule,
    AseguramientoRoutingModule
  ]
})
export class AseguramientoModule { }
