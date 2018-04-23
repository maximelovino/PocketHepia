import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { FlashService } from './flash.service';

const authUrl = "http://127.0.0.1:9080/auth";

@Injectable()
export class UserService {
  private refreshToken: string = undefined;
  private accessToken: string = undefined;

  constructor(private http: HttpClient, private flashService: FlashService) { }


  public login(username: string, password: string): Observable<any> {
    const request = {
      "app_id": "",
      "provider": "password",
      "data": username,
      "user_info": {
        "register": false,
        "password": password
      }
    }
    console.log(request);
    console.log(JSON.stringify(request));
    return this.http.post(authUrl, JSON.stringify(request), { headers: new HttpHeaders().set('Content-Type', 'application/json') })
  }

  public setRefreshToken(refreshToken: string) {
    this.refreshToken = refreshToken;
  }

  public isLoggedIn(): boolean {
    console.log(`Token ${this.refreshToken}`)
    return this.refreshToken !== undefined
  }

}
