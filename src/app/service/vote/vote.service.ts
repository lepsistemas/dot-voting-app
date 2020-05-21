import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import  { BASE_URL } from '../../shared/constants';
import { Vote } from '../../model/vote';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  private endpoint: string;
  
  constructor(private http: HttpClient) {
    this.endpoint = `${BASE_URL}/api/v1`
  }

  give(vote: Vote): Observable<Vote> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const request: string = JSON.stringify({
      cardId: vote.cardId,
      voterId: vote.voterId
    });
    return this.http.post<Vote>(`${this.endpoint}/votes`, request, httpOptions);
  }
  
}
