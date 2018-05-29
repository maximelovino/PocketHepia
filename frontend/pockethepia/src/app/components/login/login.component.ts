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
  loginError = false;
  email: string;
  password: string;
  sending = false;

  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  // TODO rewrite this using reactiveForms
  public login() {
    this.sending = true;
    this.loginError = false;
    this.authService.login(this.email, this.password).subscribe((data) => {
      this.userService.login(data);
      this.sending = false;
      this.router.navigate(['/']);
    }, error => {
      if (error) {
        this.sending = false;
        this.loginError = true;
        console.error('There was an error');
        console.error(error);
      }
    });
  }

}
