import { Component, OnInit } from '@angular/core';
import { FlashService } from '../flash.service';

@Component({
  selector: 'app-flash',
  templateUrl: './flash.component.html',
  styleUrls: ['./flash.component.css']
})
export class FlashComponent implements OnInit {

  constructor(public flashService: FlashService) { }

  ngOnInit() {
  }

}
