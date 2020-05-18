import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Card } from '../../model/card';

import  { BASE_URL } from '../../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private endpoint: string;
  
  constructor(private http: HttpClient) {
    this.endpoint = `${BASE_URL}/api/v1`
  }

  create(card: Card): Observable<Card> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const request: string = JSON.stringify({
      roomId: card.roomId,
      userId: card.userId,
      title: card.title,
      description: card.description
    });
    return this.http.post<any>(`${this.endpoint}/cards`, request, httpOptions);
  }

  fromRoom(roomId: number): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.endpoint}/cards?roomId=${roomId}`);
  }
  
}
