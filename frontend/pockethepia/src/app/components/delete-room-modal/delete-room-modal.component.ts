import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AccessService } from '../../services/access.service';
import { Room } from '../../models/room';

@Component({
  selector: 'app-delete-room-modal',
  templateUrl: './delete-room-modal.component.html',
  styleUrls: ['./delete-room-modal.component.scss']
})
export class DeleteRoomModalComponent implements OnInit {
  sending = false;

  constructor(public dialogRef: MatDialogRef<DeleteRoomModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Room, private accessService: AccessService) { }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  delete() {
    console.log('Deleting');
    this.sending = true;
    this.accessService.deleteRoom(this.data).subscribe(done => {
      this.sending = false;
      this.dialogRef.close();
    }, error => {
      this.sending = false;
      console.error(error);
    });
  }

}
