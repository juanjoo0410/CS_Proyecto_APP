import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    MatProgressBarModule, 
    SharedModule
  ]
})
export class MatriculacionModule { }
