import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { FlashService } from './flash.service';
import { RefreshTokenResponse } from './refresh-token-response';
import { AccessTokenResponse } from './access-token-response';

const authUrl = "http://127.0.0.1:9080/auth";

const jsonHeaders = new HttpHeaders().set('Content-Type', 'application/json')

@Injectable()
export class UserService {
  private refreshToken: string = undefined;
  private accessToken: string = undefined;

  constructor(private http: HttpClient, private flashService: FlashService) { }


  public login(username: string, password: string): Observable<RefreshTokenResponse> {
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
    return this.http.post<RefreshTokenResponse>(authUrl, JSON.stringify(request), { headers: jsonHeaders })
  }

  public getAccessToken(realmPath: string) {
    const request = {
      "app_id": "",
      "provider": "realm",
      "data": this.refreshToken,
      "path": realmPath
    }
    return this.http.post<AccessTokenResponse>(authUrl, JSON.stringify(request), { headers: jsonHeaders })
  }

  public setRefreshToken(refreshToken: string) {
    this.refreshToken = refreshToken;
  }
  public logout() {
    this.refreshToken = undefined;
  }

  public isLoggedIn(): boolean {
    return this.refreshToken !== undefined
  }

}
