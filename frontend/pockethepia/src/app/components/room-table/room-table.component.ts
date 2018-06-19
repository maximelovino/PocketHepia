import { Component, OnInit, ViewChild } from '@angular/core';
import { Room } from '../../models/room';
import { MatSort, MatTable } from '@angular/material';
import { AccessService } from '../../services/access.service';

@Component({
  selector: 'app-room-table',
  templateUrl: './room-table.component.html',
  styleUrls: ['./room-table.component.scss']
})
export class RoomTableComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Room>;
  isLoadingResults = false;
  data: Room[];
  dataSource: Room[] = [];
  displayedColumns = ['name', 'area', 'edit', 'delete'];
  constructor(private accessService: AccessService) { }

  ngOnInit() {
    this.sort.disableClear = true;
    this.sort.active = 'name';
    this.sort.direction = 'asc';
    this.sort.sortChange.subscribe(() => this.sortData());
    this.refresh();
  }

  public filterTable(filter: string) {
    this.dataSource = this.data.filter(u => u.name.toLowerCase().includes(filter.toLowerCase()));
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
        case 'name': return (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1) * ascendingMult;
        case 'area': return (a.area.name.toLowerCase() < b.area.name.toLowerCase() ? -1 : 1) * ascendingMult;
      }
    });
    this.table.renderRows();
  }

  private refresh() {
    this.isLoadingResults = true;
    this.accessService.getRooms().subscribe(data => {
      console.log(data);
      this.data = data;
      this.dataSource = data;
      this.sortData();
      this.isLoadingResults = false;
    }, error => {
      this.isLoadingResults = false;
    });
  }

  deleteRoom(room: Room) {
    // TODO pop modal for confirmation before sending
  }

  editRoom(room: Room) {
    // TODO here we would assign permissions for area
  }

}
