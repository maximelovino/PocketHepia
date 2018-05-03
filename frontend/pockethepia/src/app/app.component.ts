import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { Router, NavigationEnd, NavigationCancel } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ChangePasswordDialogComponent } from './components/change-password-dialog/change-password-dialog.component';

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

  constructor(public dialog: MatDialog, private userService: UserService, private router: Router) {
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
        let dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
          data: user,
        });
      }
    })
  }
}
