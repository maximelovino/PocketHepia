import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from '../../models/transaction';

@Component({
  selector: 'app-transaction-entry',
  templateUrl: './transaction-entry.component.html',
  styleUrls: ['./transaction-entry.component.scss']
})
export class TransactionEntryComponent implements OnInit {
  @Input() transaction: Transaction;
  constructor() { }

  ngOnInit() {
  }

}
