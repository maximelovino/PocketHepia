import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../../models/user';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { PermissionsFormComponent } from '../permissions-form/permissions-form.component';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss']
})
export class EditUserModalComponent implements OnInit {
  resetPassGroup: FormGroup;
  @ViewChild('permissions') permissions: PermissionsFormComponent;


  constructor(public dialogRef: MatDialogRef<EditUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User, private fb: FormBuilder) {
    this.resetPassGroup = this.fb.group({
      newPassword: ['', Validators.required],
      newPasswordConfirm: ['', Validators.required]
    }, {
        validator: this.passwordMatch()
      });
  }

  private passwordMatch(): ValidatorFn {
    return (formGroup: FormGroup) => {
      const pass = formGroup.get('newPassword');
      const passConfirm = formGroup.get('newPasswordConfirm');

      if (pass.value === passConfirm.value) {
        return null;
      } else {
        passConfirm.setErrors({ passwordMatch: true });
        return {
          passwordMatch: true
        };
      }
    };
  }

  ngOnInit() {
  }



  public resetPass() {

  }

  public changePermissions() {
    console.log(this.permissions.permGroup);
  }

}
