import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Location } from '@angular/common';
import { FlashService } from '../flash.service';
import { LoginUser } from '../login-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public model = new LoginUser();
  constructor(private userService: UserService, private router: Router, private flashService: FlashService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log("submitted")
  }

  public login() {
    console.log(this.model)

    this.userService.login(this.model.username, this.model.password).subscribe(data => {
      const token = data.refresh_token.token;
      console.log(token);
      this.userService.setRefreshToken(token);
      this.router.navigate(["/"]);
    }, error => {
      console.error(error)
    })
  }

}
