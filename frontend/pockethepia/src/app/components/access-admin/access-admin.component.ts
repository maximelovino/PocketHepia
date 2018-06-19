import { Component, OnInit, ViewChild } from '@angular/core';
import { AreaCreationComponent } from '../area-creation/area-creation.component';
import { RoomCreationComponent } from '../room-creation/room-creation.component';
import { AreaTableComponent } from '../area-table/area-table.component';
import { RoomTableComponent } from '../room-table/room-table.component';

@Component({
  selector: 'app-access-admin',
  templateUrl: './access-admin.component.html',
  styleUrls: ['./access-admin.component.scss']
})
export class AccessAdminComponent implements OnInit {
  @ViewChild('createArea') createArea: AreaCreationComponent;
  @ViewChild('createRoom') createRoom: RoomCreationComponent;
  @ViewChild('areaTable') areaTable: AreaTableComponent;
  @ViewChild('roomTable') roomTable: RoomTableComponent;

  constructor() { }

  ngOnInit() {
  }

  onAreaCreated(areaCreated: boolean) {
    this.createRoom.refresh();
    this.areaTable.refreshData();
  }

  onRoomCreated(roomCreated: boolean) {
    this.roomTable.refreshData();
  }

}
