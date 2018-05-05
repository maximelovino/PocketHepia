import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef, MatSnackBar } from '@angular/material';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-change-password-sheet',
  templateUrl: './change-password-sheet.component.html',
  styleUrls: ['./change-password-sheet.component.scss']
})
export class ChangePasswordSheetComponent implements OnInit {
  public oldPassword: String;
  public newPassword: String;
  public newPassword2: String;

  constructor(private bottomSheetRef: MatBottomSheetRef<ChangePasswordSheetComponent>, private authService: AuthService) { }

  ngOnInit() {
  }

  public passwordChange() {
    if (!(this.oldPassword && this.newPassword && this.newPassword2)) {
      this.bottomSheetRef.dismiss(false);
    } else {
      this.authService.changePassword(this.oldPassword, this.newPassword, this.newPassword2).subscribe(data => {
        console.log(data);
        this.bottomSheetRef.dismiss(true);
      }, error => {
        if (error) {
          this.bottomSheetRef.dismiss(false);
        }
      })

    }
  }

}
