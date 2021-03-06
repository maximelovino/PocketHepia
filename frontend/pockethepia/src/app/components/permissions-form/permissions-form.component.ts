import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-permissions-form',
  templateUrl: './permissions-form.component.html',
  styleUrls: ['./permissions-form.component.scss']
})
export class PermissionsFormComponent implements OnInit {
  public permGroup: FormGroup;
  @Input() public user: User;

  constructor(private fb: FormBuilder, private userService: UserService) {
    console.log(this.user);
  }

  ngOnInit() {
    this.userService.retrieveUser().subscribe(currentUser => {
      this.permGroup = this.fb.group({
        librarian: [this.user ? this.user.isLibrarian : false],
        acceptPayments: [this.user ? this.user.acceptsPayments : false],
        admin: [{ value: this.user ? this.user.isAdmin : false, disabled: this.user && (this.user.id === currentUser.id) }],
        auditor: [this.user ? this.user.isAuditor : false],
        canInvite: [this.user ? this.user.canInvite : false],
      });
    });
  }

  public reset() {
    this.permGroup.reset({
      librarian: false,
      acceptPayments: false,
      admin: false,
      auditor: false,
      canInvite: false
    });
  }

  get checkedPermissions(): String[] {
    const perms: String[] = [];
    Object.keys(this.permGroup.controls).forEach(key => {
      if (this.permGroup.get(key).value) {
        perms.push(key);
      }
    });
    return perms;
  }

}
