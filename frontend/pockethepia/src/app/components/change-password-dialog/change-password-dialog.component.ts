import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { User } from '../../models/user';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent {

  constructor(public dialogRef: MatDialogRef<ChangePasswordDialogComponent>, @Inject(MAT_DIALOG_DATA) public user: User) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
