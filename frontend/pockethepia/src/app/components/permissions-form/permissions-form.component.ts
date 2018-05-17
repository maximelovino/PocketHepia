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
  public currentUser: Observable<User> = this.userService.retrieveUser();
  @Input() public user: User;

  constructor(private fb: FormBuilder, private userService: UserService) {
    console.log(this.user);
  }

  ngOnInit() {
    /*
    TODO
          It looks like you're using the disabled attribute with a reactive form directive. If you set disabled to true
      when you set up this control in your component class, the disabled attribute will actually be set in the DOM for
      you. We recommend using this approach to avoid 'changed after checked' errors.

      Example:
      form = new FormGroup({
        first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),
        last: new FormControl('Drew', Validators.required)
      });
    */
    this.permGroup = this.fb.group({
      librarian: [this.user ? this.user.isLibrarian : false],
      acceptPayments: [this.user ? this.user.acceptsPayments : false],
      admin: [this.user ? this.user.isAdmin : false],
      auditor: [this.user ? this.user.isAuditor : false],
      canInvite: [this.user ? this.user.canInvite : false],
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
