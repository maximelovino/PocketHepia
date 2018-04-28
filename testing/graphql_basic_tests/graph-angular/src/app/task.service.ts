import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Task } from './task';
import "rxjs/add/operator/map";
import { TaskGraphResponse } from './task-graph-response';
const graphQLEndpoint = "http://localhost:9080/graphql/%2Ftest"
const jsonHeaders = new HttpHeaders().set('Content-Type', 'application/json')
@Injectable()
export class TaskService {

  constructor(private http: HttpClient, private userService: UserService) { }

  public getTasks(): Observable<Task[]> {

    const query = `query{
      tasks{
        id
        name
        done
      }`
    return this.http.post<TaskGraphResponse>(graphQLEndpoint, query).map(data => {
      return data.data.tasks;
    });

    /*return this.userService.getAccessToken("/test")
    .map(data => {
      const token = data.access_token.token;
      const headers = new HttpHeaders().set("Authorization", token);
      const query = `query{
    tasks{
      id
      name
      done
    }
  }`;
      //TODO add type here
      return this.http.post<TaskGraphResponse>(graphQLEndpoint, query, { headers: headers })
    })*/


  }

}
