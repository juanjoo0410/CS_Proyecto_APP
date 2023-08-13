import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalidadRoutingModule } from './calidad-routing.module';
import { CalidadComponent } from './calidad.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CalidadComponent
  ],
  imports: [
    CommonModule,
    CalidadRoutingModule,
    SharedModule
  ]
})
export class CalidadModule { }
