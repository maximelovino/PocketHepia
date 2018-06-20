import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AccessService } from '../../services/access.service';
import { Room } from '../../models/room';

@Component({
  selector: 'app-delete-reader-modal',
  templateUrl: './delete-reader-modal.component.html',
  styleUrls: ['./delete-reader-modal.component.scss']
})
export class DeleteReaderModalComponent implements OnInit {
  sending = false;

  constructor(public dialogRef: MatDialogRef<DeleteReaderModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private accessService: AccessService) { }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  delete() {
    const room: Room = this.data.room;
    const reader: String = this.data.reader;

    console.log('Deleting');
    this.sending = true;
    this.accessService.deleteReader(room, reader).subscribe(done => {
      this.sending = false;
      this.dialogRef.close();
    }, error => {
      this.sending = false;
      console.error(error);
    });
  }
}
