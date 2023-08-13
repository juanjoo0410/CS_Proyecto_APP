import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DimensionRoutingModule } from './dimension-routing.module';
import { DimensionComponent } from './dimension.component';


@NgModule({
  declarations: [
    DimensionComponent
  ],
  imports: [
    CommonModule,
    DimensionRoutingModule
  ]
})
export class DimensionModule { }
