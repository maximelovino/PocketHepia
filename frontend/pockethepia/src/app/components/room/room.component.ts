import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Room } from '../../models/room';
import { AccessService } from '../../services/access.service';
import { RoomAccessTableComponent } from '../room-access-table/room-access-table.component';
import { RoomReadersListComponent } from '../room-readers-list/room-readers-list.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent {
  room: Room;
  @ViewChild('roomAccessTable') roomAccessTable: RoomAccessTableComponent;
  @ViewChild('roomReaderTable') roomReadersList: RoomReadersListComponent;

  constructor(private route: ActivatedRoute, private accessService: AccessService) {
    this.route.params.subscribe(params => {
      this.accessService.getRoomByID(params['id']).subscribe(r => {
        this.room = r;
        this.roomAccessTable.setRoom(this.room);
        this.roomReadersList.setRoom(this.room);
      }, error => {
        console.error('Couldn\'t find room');
      });
    });
  }

  createdAccess(created: boolean) {
    this.roomAccessTable.refreshData();
  }

  createdReader(created: boolean) {
    this.roomReadersList.refreshData();
  }

}
