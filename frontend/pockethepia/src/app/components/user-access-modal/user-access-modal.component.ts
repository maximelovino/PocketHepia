import { Component, OnInit, Inject } from '@angular/core';
import { AccessService } from '../../services/access.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-access-modal',
  templateUrl: './user-access-modal.component.html',
  styleUrls: ['./user-access-modal.component.scss']
})
export class UserAccessModalComponent implements OnInit {
  accesses$ = this.accessService.getAccessesForUser(this.data);

  constructor(public dialogRef: MatDialogRef<UserAccessModalComponent>,
    private accessService: AccessService,
    @Inject(MAT_DIALOG_DATA) public data: User) { }

  ngOnInit() {
  }

}
