import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../../models/user';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { PermissionsFormComponent } from '../permissions-form/permissions-form.component';
import { UserService } from '../../services/user.service';
import { EditUserModalReturn } from '../../models/edit-user-modal-return';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss']
})
export class EditUserModalComponent implements OnInit {
  resetPassGroup: FormGroup;
  addToBalanceGroup: FormGroup;
  sending = false;
  @ViewChild('permissions') permissions: PermissionsFormComponent;


  constructor(public dialogRef: MatDialogRef<EditUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private fb: FormBuilder,
    private userService: UserService,
    private transactionService: TransactionService) {
    this.resetPassGroup = this.fb.group({
      newPassword: ['', Validators.required],
      newPasswordConfirm: ['', Validators.required]
    }, {
        validator: this.passwordMatch()
      });

    this.addToBalanceGroup = this.fb.group({
      amount: ['', Validators.required]
    }, {
        validator: this.amountMatch()
      });
  }
  private amountMatch(): ValidatorFn {
    return (formGroup: FormGroup) => {
      const amount = formGroup.get('amount');
      const regex = new RegExp('^[0-9]+(\.[0-9]{1,2})?$');

      if (regex.test(amount.value)) {
        return null;
      } else {
        amount.setErrors({ format: true });
        return {
          format: true
        };
      }
    };
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
    this.sending = true;
    this.userService.resetPassword(this.data, password, password2).subscribe(data => {
      this.sending = false;
      this.dialogRef.close(EditUserModalReturn.PASSWORD_RESET_OK);
    }, error => {
      this.sending = false;
      console.error(error);
      this.dialogRef.close(EditUserModalReturn.PASSWORD_RESET_FAIL);
    });
  }

  public addToBalance() {
    try {
      const amount = parseFloat(this.addToBalanceGroup.get('amount').value);
      this.sending = true;
      this.transactionService.addToBalance(this.data, amount).subscribe(data => {
        this.sending = false;
        this.dialogRef.close(EditUserModalReturn.SET_BALANCE_OK);
      }, error => {
        this.sending = false;
        console.error(error);
        this.dialogRef.close(EditUserModalReturn.SET_BALANCE_FAIL);
      });
    } catch (e) {
      this.sending = false;
      console.error(e);
      this.dialogRef.close(EditUserModalReturn.SET_BALANCE_FAIL);
      return;
    }
  }

  public changePermissions() {
    const librarian = this.permissions.permGroup.get('librarian').value;
    const acceptPayments = this.permissions.permGroup.get('acceptPayments').value;
    const admin = this.permissions.permGroup.get('admin').value;
    const auditor = this.permissions.permGroup.get('auditor').value;
    const canInvite = this.permissions.permGroup.get('canInvite').value;
    this.sending = true;
    this.userService.changePermissions(this.data, admin, librarian, acceptPayments, canInvite, auditor).subscribe(data => {
      this.sending = false;
      this.dialogRef.close(EditUserModalReturn.PERMISSION_CHANGE_OK);
    }, error => {
      this.sending = false;
      console.error(error);
      this.dialogRef.close(EditUserModalReturn.PERMISSION_CHANGE_FAIL);
    });
  }

}
