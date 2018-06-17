import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

@Component({
  selector: 'app-balance-card',
  templateUrl: './balance-card.component.html',
  styleUrls: ['./balance-card.component.scss']
})
// TODO this should go take the balance itself from the user service
export class BalanceCardComponent implements OnInit {
  currentUser: Observable<User> = this.userService.retrieveUser();

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

}
