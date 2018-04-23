import { Component, OnInit } from '@angular/core';
import { FlashService } from '../flash.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-flash',
  templateUrl: './flash.component.html',
  styleUrls: ['./flash.component.css']
})
export class FlashComponent implements OnInit {

  constructor(public flashService: FlashService, private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.flashService.clear();
      }
    })
  }

}
