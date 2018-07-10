import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionService } from '../../services/transaction.service';
import { map } from '../../../../node_modules/rxjs/operators';
import { Transaction } from '../../models/transaction';

@Component({
  selector: 'app-balance-card',
  templateUrl: './balance-card.component.html',
  styleUrls: ['./balance-card.component.scss']
})

export class BalanceCardComponent implements OnInit {
  balance$: Observable<String> = this.transactionService.getBalance().pipe(map(b => Transaction.displayMoney(b, false)));

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
  }

}
