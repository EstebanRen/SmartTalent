import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Products } from '../../entities/products.model';

@Component({
  selector: 'app-delete-items',
  templateUrl: './delete-items.component.html',
  styleUrl: './delete-items.component.css',
})
export class DeleteItemsComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Products,
    protected dialogRef: MatDialogRef<DeleteItemsComponent>
  ) {}

  onDeleteConfirm() {
    this.dialogRef.close('delete');
  }

  onCancel() {
    this.dialogRef.close('cancel');
  }
}
