import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Room } from '../../model/room';

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
    return this.http.post<Room>(BASE_URL + '/rooms', JSON.stringify(room), httpOptions);
  }

  getByOwnerAndName(owner: string, name: string): Observable<Room> {
    return this.http.get<Room>(BASE_URL + `/rooms?owner=${owner}&name=${name}`);
  }

  get(id: number): Observable<Room> {
    return this.http.get<Room>(BASE_URL + `/rooms/${id}`);
  }
  
}
