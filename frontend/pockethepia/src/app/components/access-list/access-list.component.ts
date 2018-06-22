import { Component, OnInit } from '@angular/core';
import { AccessService } from '../../services/access.service';

// TODO add loading indicator

@Component({
  selector: 'app-access-list',
  templateUrl: './access-list.component.html',
  styleUrls: ['./access-list.component.scss']
})
export class AccessListComponent implements OnInit {
  myAccesses$ = this.accessService.getMyAccesses();

  constructor(private accessService: AccessService) { }

  ngOnInit() {
  }

}
