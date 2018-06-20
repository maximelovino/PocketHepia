import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Room } from '../../models/room';
import { AccessService } from '../../services/access.service';
import { MatSort, MatTable } from '@angular/material';
import { Access } from '../../models/access';

@Component({
  selector: 'app-room-access-table',
  templateUrl: './room-access-table.component.html',
  styleUrls: ['./room-access-table.component.scss']
})
export class RoomAccessTableComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Access>;
  isLoadingResults = false;
  data: Access[];
  dataSource: Access[] = [];
  displayedColumns = ['user', 'startDate', 'endDate', 'timeRange', 'delete'];
  room: Room;
  constructor(private accessService: AccessService) { }

  ngOnInit() {
    this.sort.disableClear = true;
    this.sort.active = 'user';
    this.sort.direction = 'asc';
    this.sort.sortChange.subscribe(() => this.sortData());
  }

  setRoom(room: Room) {
    this.room = room;
    this.refreshData();
  }

  public filterTable(filter: string) {
    this.dataSource = this.data.filter(u => u.user.name.toLowerCase().includes(filter.toLowerCase()));
  }

  public refreshData() {
    const filterBar = document.querySelector('#filter') as HTMLInputElement;
    filterBar.value = '';
    this.refresh();
  }

  public sortData() {
    const ascendingMult = this.sort.direction === 'asc' ? 1 : -1;
    this.dataSource = this.dataSource.sort((a, b) => {
      switch (this.sort.active) {
        case 'user': return (a.user.name.toLowerCase() < b.user.name.toLowerCase() ? -1 : 1) * ascendingMult;
        case 'startDate': return (a.startDate.getTime() < b.startDate.getTime() ? -1 : 1) * ascendingMult;
      }
    });
    this.table.renderRows();
  }

  private refresh() {
    this.isLoadingResults = true;
    this.accessService.getAccessesForRoom(this.room).subscribe(data => {
      console.log(data);
      this.data = data;
      this.dataSource = data;
      this.sortData();
      this.isLoadingResults = false;
    }, error => {
      this.isLoadingResults = false;
    });
  }

  deleteAccess(access: Access) {

  }

}
