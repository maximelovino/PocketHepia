import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  personalFormGroup: FormGroup;
  permissionsFormGroup: FormGroup;
  public hide = true;

  constructor(private fb: FormBuilder) {
    this.personalFormGroup = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
    this.permissionsFormGroup = this.fb.group({
      librarian: [''],
      acceptPayments: [''],
      admin: [''],
      auditor: [''],
      canInvite: [''],
    });
  }

  public generatePassword() {
    // TODO do we keep this method for generating?
    const pass = Math.random().toString(36).slice(-8);
    this.personalFormGroup.get('password').setValue(pass);
  }

  public copyPass() {
    const pass = this.personalFormGroup.get('password').value;
    if (pass) {
      this.clip(pass);
    }
  }

  get checkedPermissions(): String[] {
    const perms: String[] = [];
    Object.keys(this.permissionsFormGroup.controls).forEach(key => {
      if (this.permissionsFormGroup.get(key).value) {
        perms.push(key);
      }
    });
    return perms;
  }

  private clip(text: string) {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', text);
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    if (document.execCommand('copy')) {
      // TODO do a snackbar or something
      console.log('Copy worked');
    } else {
      console.warn('Copy didn\'t work');
    }
  }

  ngOnInit() {
  }

}
