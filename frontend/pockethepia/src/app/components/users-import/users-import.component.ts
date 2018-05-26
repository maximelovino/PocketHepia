import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

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
  sending = false;

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
    this.sending = true;
    this.userService.importUsers(form).subscribe(data => {
      console.log('All good');
      this.sending = false;
      console.log(data);
      this.formGroup.reset({ csvFile: null });
      this.snackbar.open(`${data.doneCount} user${data.doneCount === 1 ? '' : 's'} imported, ${data.failedCount} failed`, 'Undo', {
        duration: 4000,
        panelClass: 'swapped-theme'
      }).onAction()
        .subscribe(() => {
          this.userService.undoImport(data.importBatch).subscribe(() => {
            this.imported.emit(true);
          });
        });
      this.imported.emit(true);
    }, (error: HttpErrorResponse) => {
      this.sending = false;
      console.error(error);
      this.snackbar.open(`Error: ${error.error}`);
      this.formGroup.reset({ csvFile: null });
    });
  }
}
