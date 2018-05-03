import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { LoginResponse } from '../models/login-response';

const LOGIN_URL = "http://localhost:8080/auth/login"

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(email: String, password: String): Observable<LoginResponse> {
    const body = { email, password };
    return this.http.post<LoginResponse>(LOGIN_URL, body)
  }

}
