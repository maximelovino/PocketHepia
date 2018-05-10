import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef, MatSnackBar } from '@angular/material';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-change-password-sheet',
  templateUrl: './change-password-sheet.component.html',
  styleUrls: ['./change-password-sheet.component.scss']
})
export class ChangePasswordSheetComponent {
  changePassGroup: FormGroup;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<ChangePasswordSheetComponent>,
    private authService: AuthService,
    private fb: FormBuilder) {
    this.changePassGroup = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      newPasswordConfirm: ['', Validators.required],
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
        return {
          passwordMatch: true
        };
      }
    };
  }


  public passwordChange() {
    const oldPassword = this.changePassGroup.get('oldPassword').value;
    const newPassword = this.changePassGroup.get('newPassword').value;
    const newPassword2 = this.changePassGroup.get('newPasswordConfirm').value;
    if (!(oldPassword && newPassword && newPassword2)) {
      this.bottomSheetRef.dismiss(false);
    } else {
      this.authService.changePassword(oldPassword, newPassword, newPassword2).subscribe(data => {
        console.log(data);
        this.bottomSheetRef.dismiss(true);
      }, error => {
        if (error) {
          this.bottomSheetRef.dismiss(false);
        }
      });
    }
  }

}
