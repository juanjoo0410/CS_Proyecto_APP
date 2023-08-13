import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActaRoutingModule } from './acta-routing.module';
import { ActaComponent } from './acta.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTableModule } from '@angular/material/table';
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ActaRoutingModule,
    SharedModule,
    MatTableModule,
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class ActaModule { }
