import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent, MatButtonToggleChange } from '@angular/material';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  startDate: Date = new Date();
  endDate: Date = new Date();

  constructor() { }

  ngOnInit() {
    // one month range filter date
    this.startDate.setMonth(this.startDate.getMonth() - 1);
  }

  public filterCategory(event: MatButtonToggleChange) {
    console.log('category');
    console.log(event);
  }

  public filterDate(event: MatDatepickerInputEvent<Date>) {
    console.log('DATE');
    console.log(event);
  }
}
