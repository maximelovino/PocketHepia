import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Area } from '../../models/area';
import { AccessService } from '../../services/access.service';

@Component({
  selector: 'app-delete-area-modal',
  templateUrl: './delete-area-modal.component.html',
  styleUrls: ['./delete-area-modal.component.scss']
})
export class DeleteAreaModalComponent implements OnInit {
  sending = false;

  constructor(public dialogRef: MatDialogRef<DeleteAreaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Area, private accessService: AccessService) { }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  delete() {
    console.log('Deleting');
    this.sending = true;
    this.accessService.deleteArea(this.data).subscribe(done => {
      this.sending = false;
      this.dialogRef.close();
    }, error => {
      this.sending = false;
      console.error(error);
    });
  }

}
