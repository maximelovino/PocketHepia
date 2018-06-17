import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent implements OnInit {
  transactions$: Observable<Transaction[]> = this.transactionService.getTransactions();

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
  }

}
