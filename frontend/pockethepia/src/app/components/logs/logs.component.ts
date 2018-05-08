import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent, MatButtonToggleChange } from '@angular/material';
import { Log } from '../../models/log';
import { LogService } from '../../services/log.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  startDate: Date = new Date();
  endDate: Date = new Date();
  public logs: Log[] = [];

  constructor(private logService: LogService) { }

  ngOnInit() {
    // one month range filter date
    this.startDate.setMonth(this.startDate.getMonth() - 1);
    this.logService.getAllLogs().subscribe(data => {
      console.log(data);
      this.logs = data;
    }, error => {
      console.error('There was a problem');
      console.error(error);
    });
  }

  // TODO This should filter locally
  public filterCategory(event: MatButtonToggleChange) {
    console.log('categories');
    console.log(event);
  }

  // TODO This should filter on server request
  public filterDate(event: MatDatepickerInputEvent<Date>) {
    console.log('DATE');
    console.log(event);
  }
}
