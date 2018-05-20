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
import { UserCreation } from '../models/user-creation';

const LOCAL_STORAGE_TOKEN_KEY = 'JWT_TOKEN';
const GET_USER_ROUTE = '/api/users/current';
const GET_ALL_USERS_ROUTE = '/api/users/all';
const CREATE_USER_ROUTE = '/api/users/create';
const DELETE_USER_ROUTE = '/api/users/delete';
const RESET_PASS_ROUTE = '/api/users/resetPassword';
const CHANGE_PERMISSIONS_ROUTE = '/api/users/changePermissions';
const IMPORT_USERS_ROUTE = '/api/users/import';

@Injectable()
export class UserService {
  private token: String = undefined;
  private user: User;

  constructor(private localStorage: LocalStorage, private http: HttpClient, private router: Router) {
    this.init();
  }

  // TODO move token and login, logout to auth service
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
    return this.http.get<User>(GET_USER_ROUTE).pipe(tap(user => this.user = user));
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
    return this.http.get<User[]>(GET_ALL_USERS_ROUTE)
      .pipe(map(users => {
        return users.map(user => new User(user));
      }));
  }

  public createUser(user: UserCreation): Observable<void> {
    return this.http.post<void>(CREATE_USER_ROUTE, user);
  }

  public deleteUser(user: User): Observable<void> {
    return this.http.delete<void>(`${DELETE_USER_ROUTE}/${user.id}`);
  }

  public resetPassword(user: User, password: String, password2: String): Observable<void> {
    return this.http.put<void>(`${RESET_PASS_ROUTE}/${user.id}`, { password, password2 });
  }

  public changePermissions(user: User,
    isAdmin: boolean,
    isLibrarian: boolean,
    acceptsPayments: boolean,
    canInvite: boolean,
    isAuditor: boolean): Observable<void> {
    return this.http.put<void>(`${CHANGE_PERMISSIONS_ROUTE}/${user.id}`, { isAdmin, isLibrarian, acceptsPayments, canInvite, isAuditor });
  }

  public importUsers(data: FormData): Observable<String> {
    return this.http.post<String>(IMPORT_USERS_ROUTE, data);
  }
}
