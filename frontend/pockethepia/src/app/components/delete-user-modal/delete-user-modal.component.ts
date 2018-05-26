import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrls: ['./delete-user-modal.component.scss']
})
export class DeleteUserModalComponent implements OnInit {
  sending = false;
  constructor(public dialogRef: MatDialogRef<DeleteUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User, private userService: UserService) { }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  delete() {
    console.log('Deleting');
    this.sending = true;
    this.userService.deleteUser(this.data).subscribe(done => {
      this.sending = false;
      console.log(` We deleted ${this.data.name}`);
      this.dialogRef.close();
    }, error => {
      this.sending = false;
      console.error(error);
    });
  }
}
