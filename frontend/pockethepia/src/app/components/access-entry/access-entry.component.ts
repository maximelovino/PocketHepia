import { Component, OnInit, Input } from '@angular/core';
import { Access } from '../../models/access';

@Component({
  selector: 'app-access-entry',
  templateUrl: './access-entry.component.html',
  styleUrls: ['./access-entry.component.scss']
})
export class AccessEntryComponent implements OnInit {
  @Input() access: Access;
  constructor() { }

  ngOnInit() {
  }

}
