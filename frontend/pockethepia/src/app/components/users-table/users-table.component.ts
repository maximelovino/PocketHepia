import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort, MatTable, MatTab, MatDialog, MatSnackBar } from '@angular/material';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { of, merge, Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { EditUserModalComponent } from '../edit-user-modal/edit-user-modal.component';
import { DeleteUserModalComponent } from '../delete-user-modal/delete-user-modal.component';
import { EditUserModalReturn } from '../../models/edit-user-modal-return';

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
  currentUser: Observable<User> = this.userService.retrieveUser();
  data: User[];
  dataSource: User[];
  isLoadingResults = false;
  selection = new SelectionModel<User>(allowMultiSelect, initialSelection);
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'email', 'permissions', 'edit', 'delete'];

  constructor(private dialog: MatDialog,
    private userService: UserService,
    private breakpointObserver: BreakpointObserver,
    private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.sort.disableClear = true;
    this.sort.active = 'name';
    this.sort.direction = 'asc';
    this.refresh();
    this.sort.sortChange.subscribe(() => this.sortData());
    this.isHandset.subscribe((match) => {
      if (match.matches) {
        this.displayedColumns = this.displayedColumns.includes('email') ? ['name', 'edit', 'delete'] : ['name', 'email', 'permissions', 'edit', 'delete'];
        this.table.renderRows();
      }
    });
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
    const openedDialog = this.dialog.open(EditUserModalComponent, { data: user });
    openedDialog.afterClosed().subscribe((closed: EditUserModalReturn) => {
      if (closed !== undefined) {
        let snackbarMessage = '';
        switch (closed) {
          case EditUserModalReturn.PASSWORD_RESET_OK:
            snackbarMessage = 'Password was successfully reset';
            break;
          case EditUserModalReturn.PASSWORD_RESET_FAIL:
            snackbarMessage = 'There was a problem resetting the password';
            break;
          case EditUserModalReturn.PERMISSION_CHANGE_OK:
            snackbarMessage = 'New permissions were successfully set';
            break;
          case EditUserModalReturn.PERMISSION_CHANGE_OK:
            snackbarMessage = 'There was a problem setting the new permissions';
            break;
        }
        this.snackbar.open(snackbarMessage, null, { duration: 2000 });
      }
      this.refreshData();
    });
  }
  public deleteUser(user: User) {
    console.log('Clicked on delete');
    console.log(user);
    const openedDialog = this.dialog.open(DeleteUserModalComponent, { data: user });
    openedDialog.afterClosed().subscribe(closed => this.refreshData());
  }

  public refreshData() {
    const filterBar = document.querySelector('#filter') as HTMLInputElement;
    filterBar.value = '';
    this.refresh();
  }

  private refresh() {
    this.userService.getAllUsers().subscribe(data => {
      console.log(data);
      this.data = data;
      this.dataSource = data;
      this.sortData();
    });
  }
}
