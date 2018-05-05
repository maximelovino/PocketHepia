import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { Router, NavigationEnd, NavigationCancel } from '@angular/router';
import { MatDialog, MatBottomSheet, MatSnackBar } from '@angular/material';
import { ChangePasswordSheetComponent } from './components/change-password-sheet/change-password-sheet.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PocketHepia';
  isConnected = false;
  //TODO Boolean and boolean is a problem
  isAdmin: Boolean = false;
  //TODO separate navigation in its own component
  //TODO add footer

  constructor(public sheet: MatBottomSheet, public dialog: MatDialog, private userService: UserService, private router: Router, public snackBar: MatSnackBar) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd || val instanceof NavigationCancel) {
        this.updateLoggedIn()
        this.updateIsAdmin();
      }
    });
  }

  ngOnInit() {
  }

  private updateIsAdmin() {
    this.userService.retrieveUser().subscribe(user => {
      this.isAdmin = user && user.isAdmin;
    })
  }

  private updateLoggedIn() {
    this.userService.isLoggedIn().subscribe(isLoggedIn => {
      this.isConnected = isLoggedIn;
    })
  }

  public logout() {
    this.userService.logout();
    this.router.navigate(["/login"]);
  }

  public changePasswordDialog() {
    this.userService.retrieveUser().subscribe(user => {
      if (user) {
        let bottomSheet = this.sheet.open(ChangePasswordSheetComponent);
        bottomSheet.afterDismissed().subscribe(value => {
          console.log(value);
          if (value !== undefined) {
            if (value) {
              this.snackBar.open("All good", null, { duration: 2000 })
            } else {
              this.snackBar.open("You didn't enter the correct password or your passwords didn't match", null, { duration: 2000 })
            }
          }
        })
      }
    })
  }
}
