import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { Router, NavigationEnd, NavigationCancel } from '@angular/router';

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

  constructor(private userService: UserService, private router: Router) {
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
      this.isAdmin = user.isAdmin;
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
}
