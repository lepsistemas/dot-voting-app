import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Room } from '../../model/room';
import { RoomEntrance } from '../../model/room-entrance';
import { RoomExit } from '../../model/room-exit';

import  { BASE_URL } from '../../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  
  private endpoint: string;
  
  constructor(private http: HttpClient) {
    this.endpoint = `${BASE_URL}/api/v1`;
  }

  public create(room: Room): Observable<Room> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<Room>(`${this.endpoint}/rooms`, JSON.stringify(room), httpOptions);
  }

  get(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.endpoint}/rooms/${id}`);
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
    return this.http.post<any>(`${this.endpoint}/rooms-entrance`, request, httpOptions);
  }

  leave(exit: RoomExit) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const request: string = JSON.stringify({
      id: exit.id,
      userId: exit.userId
    });
    return this.http.post<any>(`${this.endpoint}/rooms-exit`, request, httpOptions);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.endpoint}/rooms/${id}`);
  }

  lock(id: number): Observable<Room> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const request: string = JSON.stringify({
      lock: true
    });
    return this.http.post<Room>(`${this.endpoint}/rooms/${id}/locker`, request, httpOptions);
  }

  unlock(id: number): Observable<Room> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const request: string = JSON.stringify({
      lock: false
    });
    return this.http.post<Room>(`${this.endpoint}/rooms/${id}/locker`, request, httpOptions);
  }

  updateNumberOfVotes(id: number, numberOfVotes: number): Observable<Room> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const request: string = JSON.stringify({
      numberOfVotes: numberOfVotes
    });
    return this.http.patch<Room>(`${this.endpoint}/rooms/${id}`, request, httpOptions);
  }

  updateMultipleVotesPerCard(id: number, allowMultipleVotesPerCard: boolean): Observable<Room> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const request: string = JSON.stringify({
      allowMultipleVotesPerCard: allowMultipleVotesPerCard
    });
    return this.http.patch<Room>(`${this.endpoint}/rooms/${id}`, request, httpOptions);
  }

  updateShowResults(id: number, showResults: boolean): Observable<Room> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const request: string = JSON.stringify({
      showResults: showResults
    });
    return this.http.patch<Room>(`${this.endpoint}/rooms/${id}`, request, httpOptions);
  }
  
}
