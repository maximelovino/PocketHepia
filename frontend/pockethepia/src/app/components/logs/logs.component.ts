import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent, MatButtonToggleChange, MatSelectChange, MatAutocompleteSelectedEvent } from '@angular/material';
import { Log } from '../../models/log';
import { LogService } from '../../services/log.service';
import { User } from '../../models/user';
import { FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Observable, of } from 'rxjs';
import { map, startWith, filter } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  startDate: Date = new Date();
  endDate: Date = new Date();
  minDate = new Date(2018, 0, 3);
  categoriesList: String[] = [];
  categories: String[] = this.categoriesList;
  users: User[];
  filteredUsers: Observable<User[]>;
  userFilterControl: FormControl = new FormControl();
  userToFilter: User;
  logs: Log[] = [];
  filteredLogs: Log[] = [];

  constructor(private logService: LogService, private userService: UserService) { }

  ngOnInit() {
    // one month range filter date
    this.startDate.setMonth(this.startDate.getMonth() - 1);
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
      this.filteredUsers = this.userFilterControl.valueChanges
        .pipe(
          startWith<string | User>(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(val => this.filterUsersList(val))
        );
    }, (error: HttpErrorResponse) => {
      // TODO do we really need to do this for every admin request?
      if (error.status === 403) {
        console.error('You\'re not admin anymore');
        // TODO show modal only once
      } else {
        console.error('There was a problem retrieving all users');
      }
    });
    this.logService.getCategories().subscribe(data => {
      this.categories = data;
      this.categoriesList = data;
    }, error => {
      console.error('There was a problem retrieving categories');
    });
    this.filterDate();
  }

  private filterUsersList(val: String): User[] {
    return this.users.filter(option =>
      option.name.toLowerCase().includes(val.toLowerCase()));
  }

  public userFilterSelected(event: MatAutocompleteSelectedEvent) {
    const user: User = event.option.value;
    console.log(user);
    this.userToFilter = user;
    this.applyFilters();
  }

  public cancelUserFilter() {
    this.userFilterControl.setValue('');
    this.userToFilter = undefined;
    this.applyFilters();
  }

  public filterCategory() {
    this.applyFilters();
  }

  private applyFilters() {
    this.filteredLogs = this.logs.filter(
      log => this.categories.includes(log.category) &&
        (!this.userToFilter || (log.triggeringUser && log.triggeringUser.id === this.userToFilter.id)));
  }

  userAutoCompleteDisplay(user?: User): String | undefined {
    return user ? user.name : undefined;
  }

  public filterDate() {
    const start = this.startDate.getTime();
    const end = this.endDate.getTime();
    this.logService.getLogs(start, end).subscribe(data => {
      this.logs = data;
      this.filteredLogs = this.logs;
      this.applyFilters();
    }, error => {
      console.error('Couldn\'t retrieve logs');
    });
  }
}
