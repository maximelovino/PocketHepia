import { Component, OnInit, Inject } from '@angular/core';
import { AccessService } from '../../services/access.service';
import { Access } from '../../models/access';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-access-modal',
  templateUrl: './delete-access-modal.component.html',
  styleUrls: ['./delete-access-modal.component.scss']
})
export class DeleteAccessModalComponent implements OnInit {
  sending = false;

  constructor(public dialogRef: MatDialogRef<DeleteAccessModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Access, private accessService: AccessService) { }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  delete() {
    console.log('Deleting');
    this.sending = true;
    this.accessService.deleteAccess(this.data).subscribe(done => {
      this.sending = false;
      this.dialogRef.close();
    }, error => {
      this.sending = false;
      console.error(error);
    });
  }
}
