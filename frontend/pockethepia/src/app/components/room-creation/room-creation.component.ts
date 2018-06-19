import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AccessService } from '../../services/access.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Area } from '../../models/area';

@Component({
  selector: 'app-room-creation',
  templateUrl: './room-creation.component.html',
  styleUrls: ['./room-creation.component.scss']
})
export class RoomCreationComponent {
  @Output() roomCreated = new EventEmitter<boolean>();
  createRoomGroup: FormGroup;
  areas: Area[] = [];
  constructor(private accessService: AccessService, private fb: FormBuilder) {
    this.refresh();
    this.createRoomGroup = this.fb.group({
      area: ['', Validators.required],
      roomName: ['', Validators.required]
    });
  }

  refresh() {
    this.accessService.getAreas().subscribe(data => {
      this.areas = data;
    }, error => {
      console.error('There was a problem getting areas');
    });
  }

  createRoom() {
    const name = this.createRoomGroup.get('roomName').value;
    const area = this.createRoomGroup.get('area').value;
    this.accessService.createRoom(name, area).subscribe(data => {
      this.roomCreated.emit(true);
      this.createRoomGroup.reset();
    }, error => {
      console.error(error);
      this.createRoomGroup.reset();
    });
  }


}
