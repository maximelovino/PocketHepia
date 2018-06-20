import { Component, OnInit, ViewChild } from '@angular/core';
import { Room } from '../../models/room';
import { MatDialog, MatTable, MatSort } from '@angular/material';
import { AccessService } from '../../services/access.service';
import { Access } from '../../models/access';
import { DeleteAccessModalComponent } from '../delete-access-modal/delete-access-modal.component';
import { DeleteReaderModalComponent } from '../delete-reader-modal/delete-reader-modal.component';

@Component({
  selector: 'app-room-readers-list',
  templateUrl: './room-readers-list.component.html',
  styleUrls: ['./room-readers-list.component.scss']
})
export class RoomReadersListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<String>;
  isLoadingResults = false;
  data: String[];
  dataSource: String[] = [];
  displayedColumns = ['id', 'delete'];
  room: Room;
  constructor(private accessService: AccessService, private dialog: MatDialog) { }

  ngOnInit() {
    this.sort.disableClear = true;
    this.sort.active = 'id';
    this.sort.direction = 'asc';
    this.sort.sortChange.subscribe(() => this.sortData());
  }

  setRoom(room: Room) {
    this.room = room;
    this.refreshData();
  }

  public filterTable(filter: string) {
    this.dataSource = this.data.filter(u => u.toLowerCase().includes(filter.toLowerCase()));
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
        case 'id': return (a.toLowerCase() < b.toLowerCase() ? -1 : 1) * ascendingMult;
      }
    });
    this.table.renderRows();
  }

  private refresh() {
    this.isLoadingResults = true;
    this.accessService.getReadersForRoom(this.room).subscribe(data => {
      console.log(data);
      this.data = data;
      this.dataSource = data;
      this.sortData();
      this.isLoadingResults = false;
    }, error => {
      this.isLoadingResults = false;
    });
  }

  deleteReader(reader: String) {
    const openedDialog = this.dialog.open(DeleteReaderModalComponent, { data: { reader, room: this.room } });
    openedDialog.afterClosed().subscribe(d => {
      this.refreshData();
    });
  }

}
