import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-balance-card',
  templateUrl: './balance-card.component.html',
  styleUrls: ['./balance-card.component.scss']
})
// TODO this should go take the balance itself from the user service
export class BalanceCardComponent implements OnInit {
  balance: Observable<Number> = this.transactionService.getBalance();

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
  }

}
