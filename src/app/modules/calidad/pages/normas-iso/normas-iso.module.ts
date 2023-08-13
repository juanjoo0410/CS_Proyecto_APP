import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NormasIsoRoutingModule } from './normas-iso-routing.module';
import { NormasIsoComponent } from './normas-iso.component';


@NgModule({
  declarations: [
    NormasIsoComponent
  ],
  imports: [
    CommonModule,
    NormasIsoRoutingModule
  ]
})
export class NormasIsoModule { }
