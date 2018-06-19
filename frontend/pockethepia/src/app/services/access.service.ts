import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Area } from '../models/area';
import { map } from 'rxjs/operators';
import { Room } from '../models/room';

const CREATE_AREA_ROUTE = '/api/access/createArea';
const CREATE_ROOM_ROUTE = '/api/access/createRoom';
const GET_AREAS_ROUTE = '/api/access/areas';
const GET_ROOMS_ROUTE = '/api/access/rooms';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  constructor(private http: HttpClient) { }

  createArea(name: String): Observable<void> {
    return this.http.post<void>(CREATE_AREA_ROUTE, { name });
  }

  createRoom(name: String, areaID: String): Observable<void> {
    return this.http.post<void>(CREATE_ROOM_ROUTE, { name, areaID });
  }

  getAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(GET_AREAS_ROUTE).pipe(map(res => {
      return res.map(r => new Area(r));
    }));
  }

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(GET_ROOMS_ROUTE).pipe(map(res => {
      return res.map(r => new Room(r));
    }));
  }
}
