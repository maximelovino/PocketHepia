import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Area } from '../models/area';
import { map } from 'rxjs/operators';
import { Room } from '../models/room';
import { Access } from '../models/access';
import { User } from '../models/user';

const CREATE_AREA_ROUTE = '/api/access/createArea';
const CREATE_ROOM_ROUTE = '/api/access/createRoom';
const GET_AREAS_ROUTE = '/api/access/areas';
const GET_ROOMS_ROUTE = '/api/access/rooms';
const GET_SINGLE_ROOM_ROUTE = '/api/access/room';
const DELETE_ROOM_ROUTE = '/api/access/room';
const GET_MY_ACCESSES_ROUTE = '/api/access/accesses/my';
const CREATE_ACCESS_ROUTE = '/api/access/giveAccess';
const GET_ACCESS_FOR_ROOM_ROUTE = '/api/access/accesses/room';
const GET_ACCESS_FOR_USER_ROUTE = '/api/access/accesses/user';
const DELETE_ACCESS_ROUTE = '/api/access/accesses';
const DELETE_AREA_ROUTE = '/api/access/area';
const CREATE_READER_ROUTE = '/api/access/accesses/room/reader';

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

  getMyAccesses(): Observable<Access[]> {
    return this.http.get<Access[]>(GET_MY_ACCESSES_ROUTE).pipe(map(res => {
      return res.map(r => new Access(r));
    }));
  }

  getRoomByID(id: string): Observable<Room> {
    return this.http.get<Room>(`${GET_SINGLE_ROOM_ROUTE}/${id}`).pipe(map(res => new Room(res)));
  }

  getAccessesForRoom(room: Room): Observable<Access[]> {
    return this.http.get<Access[]>(`${GET_ACCESS_FOR_ROOM_ROUTE}/${room.id}`).pipe(map(res => res.map(r => new Access(r))));
  }

  getAccessesForUser(user: User): Observable<Access[]> {
    return this.http.get<Access[]>(`${GET_ACCESS_FOR_USER_ROUTE}/${user.id}`).pipe(map(res => res.map(r => new Access(r))));
  }

  deleteRoom(room: Room): Observable<void> {
    return this.http.delete<void>(`${DELETE_ROOM_ROUTE}/${room.id}`);
  }

  deleteAccess(access: Access): Observable<void> {
    return this.http.delete<void>(`${DELETE_ACCESS_ROUTE}/${access.id}`);
  }

  deleteArea(area: Area): Observable<void> {
    return this.http.delete<void>(`${DELETE_AREA_ROUTE}/${area.id}`);
  }

  createAccess(roomID: string,
    userID: string,
    startDate: number,
    endDate?: number,
    startTime?: number,
    endTime?: number): Observable<void> {
    return this.http.post<void>(CREATE_ACCESS_ROUTE, { roomID, userID, startDate, endDate, startTime, endTime });
  }

  createReader(room: Room, readerID: String): Observable<void> {
    return this.http.post<void>(CREATE_READER_ROUTE, { identifier: readerID, roomID: room.id });
  }



  getReadersForRoom(room: Room): Observable<String[]> {
    const route = `/api/access/accesses/room/${room.id}/readers`;
    return this.http.get<String[]>(route).pipe(map(res => res.map(r => String(r))));
  }

  deleteReader(room: Room, reader: String): Observable<void> {
    const route = `/api/access//accesses/room/${room.id}/reader/${reader}`;
    return this.http.delete<void>(route);
  }
}
