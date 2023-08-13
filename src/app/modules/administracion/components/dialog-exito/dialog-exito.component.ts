import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-exito',
  templateUrl: './dialog-exito.component.html',
  styleUrls: ['./dialog-exito.component.css']
})
export class DialogExitoComponent {

  constructor(private router: Router, private dialogRef: MatDialogRef<DialogExitoComponent>) {}

  onSubmit() {
    
    this.dialogRef.close();
  }

}
