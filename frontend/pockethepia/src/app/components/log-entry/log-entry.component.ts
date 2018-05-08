import { Component, OnInit, Input } from '@angular/core';
import { Log } from '../../models/log';

@Component({
  selector: 'app-log-entry',
  templateUrl: './log-entry.component.html',
  styleUrls: ['./log-entry.component.scss']
})
export class LogEntryComponent implements OnInit {
  @Input() public log: Log;

  constructor() { }

  ngOnInit() {
  }

}
