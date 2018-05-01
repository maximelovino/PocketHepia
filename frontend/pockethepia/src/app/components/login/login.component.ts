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
  email: string;
  password: string;

  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  public login() {
    console.log("You clicked the shit");
    this.authService.login(this.email, this.password).subscribe((data) => {
      this.userService.login(data.token);
      this.router.navigate(["/"]);
    }, error => {
      console.error("There was an error");
      console.error(error);
    })
  }

}
