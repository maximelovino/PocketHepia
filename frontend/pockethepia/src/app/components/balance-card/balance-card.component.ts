import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-balance-card',
  templateUrl: './balance-card.component.html',
  styleUrls: ['./balance-card.component.scss']
})
export class BalanceCardComponent implements OnInit {
  @Input() public balance: Number;

  constructor() { }

  ngOnInit() {
  }

}
