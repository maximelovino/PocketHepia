import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //TODO let's check what we do with userService
  //TODO that sounds cool
  constructor(public userService: UserService) {
    userService.retrieveUser().subscribe(user => {
      console.log(user)
      const userJSON = JSON.stringify(user);
      const pre = document.querySelector('#userPre');
      pre.innerHTML = userJSON;
    });
  }

  ngOnInit() {
  }

}
