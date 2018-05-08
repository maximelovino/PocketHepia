import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { Log } from '../models/log';
import { UserService } from './user.service';

const GET_ALL_LOGS_URL = '/api/logs/all';


@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private http: HttpClient, private userService: UserService) { }

  public getAllLogs(): Observable<Log[]> {
    return this.userService.getToken().pipe(flatMap((token) => {
      return this.http.get<Log[]>(GET_ALL_LOGS_URL,
        { headers: new HttpHeaders().set('Authorization', `Bearer ${token}`) });
    }));
  }
}
