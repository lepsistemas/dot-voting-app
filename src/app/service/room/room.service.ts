import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Room } from '../../model/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private BASE_URL: string = 'http://dot-voting-server.herokuapp.com/api/v1';

  constructor(private http: HttpClient) { }

  public create(room: Room): Observable<Room> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<Room>(this.BASE_URL + '/rooms', JSON.stringify(room), httpOptions);
  }
  
}
