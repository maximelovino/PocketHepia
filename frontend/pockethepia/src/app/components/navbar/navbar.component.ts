import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, NavigationEnd, NavigationCancel } from '@angular/router';
import { MatDialog, MatBottomSheet, MatSnackBar } from '@angular/material';
import { ChangePasswordSheetComponent } from '../change-password-sheet/change-password-sheet.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  title = 'PocketHepia';
  isConnected = false;
  isAdmin = false;


  constructor(public sheet: MatBottomSheet,
    public dialog: MatDialog,
    public userService: UserService,
    private router: Router,
    public snackBar: MatSnackBar) {
  }

  public changePasswordDialog() {
    const bottomSheet = this.sheet.open(ChangePasswordSheetComponent);
    bottomSheet.afterDismissed().subscribe(value => {
      console.log(value);
      if (value !== undefined) {
        if (value) {
          this.snackBar.open('All good', null, { duration: 2000 });
        } else {
          this.snackBar.open('You didn\'t enter the correct password or your passwords didn\'t match', null, { duration: 2000 });
        }
      }
    });
  }
}
