import { Component, OnInit, Input } from '@angular/core';
import { Room } from '../../models/room';

@Component({
  selector: 'app-room-reader-creation',
  templateUrl: './room-reader-creation.component.html',
  styleUrls: ['./room-reader-creation.component.scss']
})
export class RoomReaderCreationComponent implements OnInit {
  @Input() room: Room;
  constructor() { }

  ngOnInit() {
  }

}
