import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-pup-up-message',
  templateUrl: './pup-up-message.component.html',
  styleUrl: './pup-up-message.component.css'
})
export class PupUpMessageComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected dialogRef: MatDialogRef<PupUpMessageComponent>,) { }

    close(){
      this.dialogRef.close(true);
    }
  }
