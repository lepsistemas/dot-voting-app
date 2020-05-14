import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Room } from '../../model/room';
import { RoomEntrance } from '../../model/room-entrance';

import  { BASE_URL } from '../../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  
  constructor(private http: HttpClient) { }

  public create(room: Room): Observable<Room> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<Room>(`${BASE_URL}/rooms`, JSON.stringify(room), httpOptions);
  }

  get(id: number): Observable<Room> {
    return this.http.get<Room>(`${BASE_URL}/rooms/${id}`);
  }

  enter(entrance: RoomEntrance): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const request: string = JSON.stringify({
      name: entrance.name,
      key: entrance.key,
      username: entrance.username
    });
    return this.http.post<any>(`${BASE_URL}/rooms-entrance`, request, httpOptions);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${BASE_URL}/rooms/${id}`);
  }

  lock(id: number): Observable<Room> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const request: string = JSON.stringify({
      lock: Boolean(true)
    });
    return this.http.post<Room>(`${BASE_URL}/rooms/${id}/locker`, request, httpOptions);
  }

  unlock(id: number): Observable<Room> {
    const request: string = JSON.stringify({
      lock: Boolean(false)
    });
    return this.http.post<Room>(`${BASE_URL}/rooms/${id}/locker`, request);
  }
  
}
