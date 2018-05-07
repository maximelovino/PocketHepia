import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-log-entry',
  templateUrl: './log-entry.component.html',
  styleUrls: ['./log-entry.component.scss']
})
export class LogEntryComponent implements OnInit {
  @Input() name: String;
  @Input() description: String;

  constructor() { }

  ngOnInit() {
  }

}
