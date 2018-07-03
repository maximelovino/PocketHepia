import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
	@ViewChild('usersTable') table: UsersTableComponent;
	@ViewChild('userCreate') create: CreateUserComponent;

	constructor() { }

	ngOnInit() {
	}

	onCreated(created: boolean) {
		console.log('User created');
		this.table.refreshData();
	}

}
