import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../../model/user';

import  { BASE_URL } from '../../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private endpoint: string;
  
  constructor(private http: HttpClient) {
    this.endpoint = `${BASE_URL}/api/v1`
  }

  get(id: number): Observable<User> {
    return this.http.get<User>(`${this.endpoint}/users/${id}`);
  }
  
}
