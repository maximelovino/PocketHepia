import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Room } from '../../models/room';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccessService } from '../../services/access.service';

@Component({
  selector: 'app-room-reader-creation',
  templateUrl: './room-reader-creation.component.html',
  styleUrls: ['./room-reader-creation.component.scss']
})
export class RoomReaderCreationComponent {
  @Input() room: Room;
  @Output() readerCreated = new EventEmitter<boolean>();
  formGroup: FormGroup;
  constructor(private accessService: AccessService, private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      identifier: ['', Validators.required],
    });
  }

  createReader() {
    const id = this.formGroup.get('identifier').value;

    this.accessService.createReader(this.room, id).subscribe(data => {
      this.formGroup.reset();
      this.readerCreated.emit(true);
    }, error => {
      console.error(`Problem creating reader for room ${this.room.name}`);
    });
  }

}
