import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs/Observable';
import { of } from "rxjs/observable/of";
import { tap, map } from "rxjs/operators";

const LOCAL_STORAGE_TOKEN_KEY = "JWT_TOKEN";

@Injectable()
export class UserService {
  private token: String = undefined;

  constructor(private localStorage: LocalStorage) {
    this.init();
  }

  private init() {
    //retrieve token from localstorage if any
    this.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY).subscribe(data => {
      if (data) {
        this.token = data;
      }
    })
  }

  public isLoggedIn(): Observable<boolean> {
    console.log(`Am I logged in? ${this.token}`);
    //here we should continue because the getItem is asynchronous from localstorage
    //TODO so if this is false, we get from local storage here as well, and this returns Observable<Boolean>
    if (this.token) {
      return of(true);
    } else {
      return this.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY).pipe(map((value) => value !== undefined))
    }
  }

  private saveTokenToLocalStorage(token: String) {
    //save to local storage
    this.localStorage.setItemSubscribe(LOCAL_STORAGE_TOKEN_KEY, token);
  }

  public logout() {
    this.token = undefined;
    this.localStorage.removeItemSubscribe(LOCAL_STORAGE_TOKEN_KEY);
  }
  public login(token: String) {
    console.log("Logging in")
    this.token = token;
    this.saveTokenToLocalStorage(token);
  }

}
