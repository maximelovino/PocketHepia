import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginError: boolean = false;
  email: string;
  password: string;

  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    //TODO do this differently? with a guard or something?
    this.userService.isLoggedIn().subscribe(isLoggedIn => {
      if (isLoggedIn)
        this.router.navigate(["/"]);
    })
  }

  public login() {
    this.authService.login(this.email, this.password).subscribe((data) => {
      this.userService.login(data);
      this.router.navigate(["/"]);
    }, error => {
      //TODO tell the user it's false, with a written feedback or modal or something
      //TODO handle errors on backend calls in a standard way
      this.loginError = true;
      console.error("There was an error");
      console.error(error);
    })
  }

}
