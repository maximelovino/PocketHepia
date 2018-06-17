import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction';
import { map } from 'rxjs/operators';


const SET_BALANCE_ROUTE = '/api/transactions/setBalance';
const GET_TRANSACTIONS_ROUTE = '/api/transactions/my';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  public setBalance(user: User, amount: Number): Observable<void> {
    return this.http.post<void>(SET_BALANCE_ROUTE, { userID: user.id, amount: amount });
  }

  public getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(GET_TRANSACTIONS_ROUTE).pipe(map(res => {
      return res.map(t => new Transaction(t));
    }));
  }
}
