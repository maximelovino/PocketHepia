import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/observable";
import { TokenResponse } from '../models/token-response';

const LOGIN_URL = "http://localhost:8080/auth/login"

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }


  public login(email: String, password: String): Observable<TokenResponse> {
    const body = { email, password };
    return this.http.post<TokenResponse>(LOGIN_URL, body)
  }

}
