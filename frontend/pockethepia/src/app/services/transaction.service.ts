import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';


const SET_BALANCE_ROUTE = '/api/transactions/setBalance';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  public setBalance(user: User, amount: Number): Observable<void> {
    return this.http.post<void>(SET_BALANCE_ROUTE, { userID: user.id, amount: amount });
  }
}
