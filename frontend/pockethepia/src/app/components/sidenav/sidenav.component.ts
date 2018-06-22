import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { ChangePasswordSheetComponent } from '../change-password-sheet/change-password-sheet.component';
import { MatSnackBar, MatBottomSheet } from '@angular/material';
import { User } from '../../models/user';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  user: Observable<User> = this.userService.retrieveUser();
  isLoggedIn = false;
  isAdmin = false;

  constructor(private breakpointObserver: BreakpointObserver,
    public userService: UserService,
    public sheet: MatBottomSheet,
    public snackBar: MatSnackBar, private router: Router) {

    this.router.events.subscribe(events => {
      if (events instanceof NavigationEnd) {
        this.refreshNavStatus();
      }
    });
  }

  refreshNavStatus() {
    this.userService.isLoggedIn().subscribe(data => {
      this.isLoggedIn = data;
      if (data) {
        this.userService.isAdmin().subscribe(admin => {
          this.isAdmin = admin;
        });
      }
    });
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
