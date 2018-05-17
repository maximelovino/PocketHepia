import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../../models/user';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { PermissionsFormComponent } from '../permissions-form/permissions-form.component';
import { UserService } from '../../services/user.service';
import { EditUserModalReturn } from '../../models/edit-user-modal-return';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss']
})
export class EditUserModalComponent implements OnInit {
  resetPassGroup: FormGroup;
  @ViewChild('permissions') permissions: PermissionsFormComponent;


  constructor(public dialogRef: MatDialogRef<EditUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private fb: FormBuilder,
    private userService: UserService) {
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
    const password = this.resetPassGroup.get('newPassword').value;
    const password2 = this.resetPassGroup.get('newPasswordConfirm').value;
    this.userService.resetPassword(this.data, password, password2).subscribe(data => {
      this.dialogRef.close(EditUserModalReturn.PASSWORD_RESET_OK);
    }, error => {
      console.error(error);
      this.dialogRef.close(EditUserModalReturn.PASSWORD_RESET_FAIL);
    });
  }

  public changePermissions() {
    const librarian = this.permissions.permGroup.get('librarian').value;
    const acceptPayments = this.permissions.permGroup.get('acceptPayments').value;
    const admin = this.permissions.permGroup.get('admin').value;
    const auditor = this.permissions.permGroup.get('auditor').value;
    const canInvite = this.permissions.permGroup.get('canInvite').value;
    this.userService.changePermissions(this.data, admin, librarian, acceptPayments, canInvite, auditor).subscribe(data => {
      this.dialogRef.close(EditUserModalReturn.PERMISSION_CHANGE_OK);
    }, error => {
      console.error(error);
      this.dialogRef.close(EditUserModalReturn.PERMISSION_CHANGE_FAIL);
    });
  }

}
