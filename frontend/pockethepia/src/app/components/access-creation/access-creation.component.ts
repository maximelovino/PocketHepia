import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Room } from '../../models/room';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormControl, FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material';
import { AccessService } from '../../services/access.service';



@Component({
  selector: 'app-access-creation',
  templateUrl: './access-creation.component.html',
  styleUrls: ['./access-creation.component.scss']
})
export class AccessCreationComponent implements OnInit {
  @Input() room: Room;
  users: User[];
  filteredUsers: Observable<User[]>;
  formGroup: FormGroup;
  timeFormatHint = 'Format: HH:mm, for example 13:45';
  userFilterControl: FormControl = new FormControl('', [Validators.required]);
  startDate = new FormControl(new Date(), [Validators.required]);
  endDateCheckboxControl = new FormControl(false);
  endDate = new FormControl({ value: '', disabled: true }, );

  startTimeCheckboxControl = new FormControl(false);
  startTime = new FormControl({ value: '00:00', disabled: true }, [this.timeFormat()]);

  endTimeCheckboxControl = new FormControl(false);
  endTime = new FormControl({ value: '23:59', disabled: true }, [this.timeFormat()]);

  @Output() accessCreated = new EventEmitter<boolean>();

  constructor(private userService: UserService, private fb: FormBuilder, private accessService: AccessService) {
    this.formGroup = this.fb.group({
      user: this.userFilterControl,
      startDate: this.startDate,
      endDateCheckboxControl: this.endDateCheckboxControl,
      endDate: this.endDate,
      startTimeCheckboxControl: this.startTimeCheckboxControl,
      startTime: this.startTime,
      endTimeCheckboxControl: this.endTimeCheckboxControl,
      endTime: this.endTime
    });
  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(us => {
      this.users = us;
      this.filteredUsers = this.userFilterControl.valueChanges
        .pipe(
          startWith<string | User>(''),
          map(value => typeof value === 'string' ? value : (value ? value.name : '')),
          map(val => this.filterUsersList(val))
        );
    }, error => {
      console.error('There was a problem getting all users');
    });
  }

  private timeFormat(): ValidatorFn {
    return (control: FormControl) => {
      const value = control.value;
      const regex = new RegExp('^(([0-1][0-9])|(2[0-3])):[0-5][0-9]$');
      if (regex.test(value)) {
        return null;
      } else {
        control.setErrors({ format: true });
        return {
          format: true
        };
      }
    };
  }

  private filterUsersList(val: String): User[] {
    return this.users.filter(option =>
      option.name.toLowerCase().includes(val.toLowerCase()));
  }

  userAutoCompleteDisplay(user?: User): String | undefined {
    return user ? user.name : undefined;
  }

  createAccess() {
    const user: User = this.userFilterControl.value;
    const startDate: Date = this.startDate.value;

    const userID = user.id;
    const roomID = this.room.id;
    const startDateTime = startDate.getTime();

    const endDateTime = this.endDateCheckboxControl.value ? (this.endDate.value as Date).getTime() : undefined;

    const startTime: number = this.startTimeCheckboxControl.value ? this.parseTime(this.startTime.value) : undefined;

    const endTime: number = this.endTimeCheckboxControl.value ? this.parseTime(this.endTime.value) : undefined;


    this.accessService.createAccess(roomID.toString(), userID.toString(), startDateTime, endDateTime, startTime, endTime)
      .subscribe(data => {
        console.log('It worked');
        this.formGroup.reset({
          user: '',
          startDate: new Date(),
          endDateCheckboxControl: false,
          endDate: { value: '', disabled: true },
          startTimeCheckboxControl: false,
          startTime: { value: '00:00', disabled: true },
          endTimeCheckboxControl: false,
          endTime: { value: '23:59', disabled: true }
        });
        this.accessCreated.emit(true);
      }, error => {
        console.error('There was a problem');
      });
  }

  parseTime(timeString: string) {
    const [hours, minutes] = timeString.split(':').map(a => parseInt(a, 10));

    return hours * 60 + minutes;
  }

  checkboxChange(change: MatCheckboxChange) {
    let control: FormControl;

    switch (change.source.name) {
      case 'endDateCheckbox':
        control = this.endDate;
        break;
      case 'startTimeCheckbox':
        control = this.startTime;
        break;
      case 'endTimeCheckbox':
        control = this.endTime;
        break;
    }

    if (!control) {
      return;
    }

    if (change.checked) {
      control.enable();
    } else {
      control.disable();
    }
  }

}
