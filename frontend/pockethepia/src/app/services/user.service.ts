import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, map, flatMap } from 'rxjs/operators';
import { LoginResponse } from '../models/login-response';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';

const LOCAL_STORAGE_TOKEN_KEY = 'JWT_TOKEN';
const GET_USER_ROUTE = '/api/users/current';
const GET_ALL_USERS_ROUTE = '/api/users/all';

@Injectable()
export class UserService {
  private token: String = undefined;
  private user: User;

  constructor(private localStorage: LocalStorage, private http: HttpClient, private router: Router) {
    this.init();
  }

  public getToken(): Observable<String> {
    if (this.token) {
      return of(this.token);
    } else {
      return this.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY).pipe(tap(token => this.token = token));
    }
  }

  // TODO store user in service and if we already have, return of(user)
  public retrieveUser(): Observable<User> {
    if (this.user) {
      return of(this.user);
    }
    return this.getToken().pipe(flatMap((token) => {
      if (token) {
        return this.http.get<User>(GET_USER_ROUTE, { headers: new HttpHeaders().set('Authorization', `Bearer ${token}`) })
          .pipe(tap(user => this.user = user));
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
    this.user = undefined;
    this.localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY).subscribe(done => this.router.navigate(['/login']));
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
