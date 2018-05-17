import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users-import',
  templateUrl: './users-import.component.html',
  styleUrls: ['./users-import.component.scss']
})
export class UsersImportComponent implements OnInit {

  formGroup = this.fb.group({
    csvFile: [null, Validators.required]
  });

  file: any = undefined;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
  }

  public fileChange(event: any) {
    console.log(event);
    this.file = event.target.files[0];
  }

  private prepareSave(): FormData {
    const input = new FormData();
    input.append('csvFile', this.file);
    return input;
  }

  public uploadFile() {
    console.log('hi');
    console.log(this.file);
    const form = this.prepareSave();
    console.log(form);
    this.userService.importUsers(form).subscribe(data => {
      console.log('All good');
      // TODO here we should emit the event
    }, error => {
      console.error(error);
    });
  }
}
