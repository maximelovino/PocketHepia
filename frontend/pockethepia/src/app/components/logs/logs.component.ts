import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent, MatButtonToggleChange, MatSelectChange } from '@angular/material';
import { Log } from '../../models/log';
import { LogService } from '../../services/log.service';
import { User } from '../../models/user';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  startDate: Date = new Date();
  endDate: Date = new Date();
  categoriesList: String[] = [];
  categories: String[] = this.categoriesList;
  logs: Log[] = [];
  filteredLogs: Log[] = [];

  constructor(private logService: LogService) { }

  ngOnInit() {
    // one month range filter date
    this.startDate.setMonth(this.startDate.getMonth() - 1);
    this.logService.getCategories().subscribe(data => {
      this.categories = data;
      this.categoriesList = data;
    }, error => {
      console.error('There was a problem retrieving categories');
    });
    this.logService.getAllLogs().subscribe(data => {
      console.log(data);
      this.logs = data;
      this.filterCategory();
    }, error => {
      console.error('There was a problem retrieving logs');
      console.error(error);
    });
  }

  // TODO This should filter locally
  public filterCategory() {
    this.filteredLogs = this.logs.filter(log => this.categories.includes(log.category));
  }

  // TODO This should filter on server request
  public filterDate(event: MatDatepickerInputEvent<Date>) {
    console.log('DATE');
    console.log(event);
  }
}
