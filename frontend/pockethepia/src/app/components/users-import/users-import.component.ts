import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-users-import',
  templateUrl: './users-import.component.html',
  styleUrls: ['./users-import.component.scss']
})
export class UsersImportComponent implements OnInit {
  @Output() imported = new EventEmitter<boolean>();
  formGroup = this.fb.group({
    csvFile: [null, Validators.required]
  });

  file: any = undefined;

  constructor(private fb: FormBuilder, private userService: UserService, private snackbar: MatSnackBar) { }

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
      this.formGroup.reset({ csvFile: null });
      this.snackbar.open('Users imported', 'Undo', { duration: 4000 }).onAction().subscribe(() => {
        console.log('You clicked the action bar action');
      })
      this.imported.emit(true);
    }, error => {
      console.error(error);
    });
  }
}
