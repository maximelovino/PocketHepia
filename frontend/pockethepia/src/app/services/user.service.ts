import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, map, flatMap } from 'rxjs/operators';
import { LoginResponse } from '../models/login-response';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

const LOCAL_STORAGE_TOKEN_KEY = 'JWT_TOKEN';
const GET_USER_ROUTE = '/api/users/current';
const GET_ALL_USERS_ROUTE = '/api/users/all';

@Injectable()
export class UserService {
  private token: String = undefined;

  constructor(private localStorage: LocalStorage, private http: HttpClient) {
    this.init();
  }

  public getToken(): Observable<String> {
    if (this.token) {
      return of(this.token);
    } else {
      return this.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    }
  }

  // This should be asynchronous, and return when fetched from local storage or variable
  public retrieveUser(): Observable<User> {
    return this.getToken().pipe(flatMap((token) => {
      if (token) {
        return this.http.get<User>(GET_USER_ROUTE, { headers: new HttpHeaders().set('Authorization', `Bearer ${token}`) });
      } else {
        return of(undefined);
      }
    }));
  }

  private init() {
    this.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY).subscribe(data => {
      if (data) {
        this.token = data;
      }
    });
  }

  public isLoggedIn(): Observable<boolean> {
    return this.getToken().pipe(map(token => {
      return token !== undefined && token !== null;
    }));
  }

  public isAdmin(): Observable<boolean> {
    return this.retrieveUser().pipe(map(user => {
      if (user) {
        return user.isAdmin;
      } else {
        return false;
      }
    }));
  }

  private saveTokenToLocalStorage(token: String) {
    this.localStorage.setItemSubscribe(LOCAL_STORAGE_TOKEN_KEY, token);
  }

  public logout() {
    this.token = undefined;
    this.localStorage.removeItemSubscribe(LOCAL_STORAGE_TOKEN_KEY);
  }

  public login(data: LoginResponse) {
    console.log('Logging in');
    this.token = data.token;
    this.saveTokenToLocalStorage(this.token);
  }

  public getAllUsers(): Observable<User[]> {
    return this.getToken().pipe(flatMap((token) => {
      if (token) {
        return this.http.get<User>(GET_ALL_USERS_ROUTE, { headers: new HttpHeaders().set('Authorization', `Bearer ${token}`) });
      } else {
        return of(undefined);
      }
    }));
  }

}
