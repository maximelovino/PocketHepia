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
    private userService: UserService,
    private router: Router,
    public snackBar: MatSnackBar) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd || val instanceof NavigationCancel) {
        this.updateLoggedIn();
        this.updateIsAdmin();
      }
    });
  }

  private updateIsAdmin() {
    this.userService.retrieveUser().subscribe(user => {
      this.isAdmin = (user && user.isAdmin) as boolean;
    });
  }

  private updateLoggedIn() {
    this.userService.isLoggedIn().subscribe(isLoggedIn => {
      this.isConnected = isLoggedIn;
    });
  }

  public logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  public changePasswordDialog() {
    this.userService.retrieveUser().subscribe(user => {
      if (user) {
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
    });
  }

}
