import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { flatMap } from "rxjs/operators";
import { LoginResponse } from '../models/login-response';
import { UserService } from './user.service';
import { User } from '../models/user';

const LOGIN_URL = "http://localhost:8080/auth/login"
const CHANGE_PASSWORD_URL = "http://localhost:8080/auth/changePassword"

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private userService: UserService) { }

  public login(email: String, password: String): Observable<LoginResponse> {
    const body = { email, password };
    return this.http.post<LoginResponse>(LOGIN_URL, body)
  }

  public changePassword(oldPassword: String, password: String, password2: String): Observable<void> {
    return this.userService.getToken().pipe(flatMap((token) => {
      return this.http.post<void>(CHANGE_PASSWORD_URL, { oldPassword, password, password2 }, { headers: new HttpHeaders().set("Authorization", `Bearer ${token}`) });
    }))
  }

}
