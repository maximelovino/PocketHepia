import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersTableComponent } from '../users-table/users-table.component';
import { CreateUserComponent } from '../create-user/create-user.component';
import { UsersImportComponent } from '../users-import/users-import.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @ViewChild('usersTable') table: UsersTableComponent;
  @ViewChild('userCreate') create: CreateUserComponent;
  @ViewChild('usersImport') import: UsersImportComponent;

  constructor() { }

  ngOnInit() {
  }

  onCreated(created: boolean) {
    console.log('User created');
    this.table.refreshData();
  }

}
