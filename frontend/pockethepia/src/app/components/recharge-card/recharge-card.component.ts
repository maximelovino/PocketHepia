import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RechargeModalComponent } from '../recharge-modal/recharge-modal.component';

@Component({
  selector: 'app-recharge-card',
  templateUrl: './recharge-card.component.html',
  styleUrls: ['./recharge-card.component.scss']
})
export class RechargeCardComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }


  public openRechargeModal() {
    this.dialog.open(RechargeModalComponent);
  }
}
