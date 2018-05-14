import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable, MatTab } from '@angular/material';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { of, merge } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';

const initialSelection = [];
const allowMultiSelect = false;

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<User>;
  data: User[];
  dataSource: User[];
  isLoadingResults = false;
  selection = new SelectionModel<User>(allowMultiSelect, initialSelection);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'email', 'permissions', 'edit', 'delete'];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.sort.disableClear = true;
    this.sort.active = 'name';
    this.sort.direction = 'asc';
    this.userService.getAllUsers().subscribe(data => {
      console.log(data);
      this.data = data;
      this.dataSource = data;
    });
    this.sort.sortChange.subscribe(() => this.sortData());
  }

  public sortData() {
    const ascendingMult = this.sort.direction === 'asc' ? 1 : -1;
    this.dataSource = this.dataSource.sort((a, b) => {
      switch (this.sort.active) {
        case 'name': return (a.name < b.name ? -1 : 1) * ascendingMult;
        case 'email': return (a.email < b.email ? -1 : 1) * ascendingMult;
      }
    });
    this.table.renderRows();

  }

  public filterTable(filter: string) {

    this.dataSource = this.data.filter(u => u.name.toLowerCase().includes(filter.toLowerCase()));
  }

  public editUser(user: User) {
    console.log('Clicked on edit');
    console.log(user);
  }
  public deleteUser(user: User) {
    console.log('Clicked on delete');
    console.log(user);
  }
}
