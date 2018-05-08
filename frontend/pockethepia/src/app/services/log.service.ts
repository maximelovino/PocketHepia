import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { Log } from '../models/log';
import { UserService } from './user.service';

const GET_ALL_LOGS_URL = '/api/logs/all';
const GET_CATEGORIES_URL = '/api/logs/categories';


@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private http: HttpClient, private userService: UserService) { }

  public getAllLogs(): Observable<Log[]> {
    return this.userService.getToken().pipe(flatMap((token) => {
      return this.http.get<Log[]>(GET_ALL_LOGS_URL,
        { headers: new HttpHeaders().set('Authorization', `Bearer ${token}`) })
        .pipe(map(res => {
          res.forEach((d) => {
            d.date = new Date(d.date);
          });
          return res;
        }));
    }));
  }

  public getCategories(): Observable<String[]> {
    return this.userService.getToken().pipe(flatMap((token) => {
      return this.http.get<String[]>(GET_CATEGORIES_URL,
        { headers: new HttpHeaders().set('Authorization', `Bearer ${token}`) });
    }));
  }
}
