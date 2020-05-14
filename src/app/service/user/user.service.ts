import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../../model/user';

import  { BASE_URL } from '../../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http: HttpClient) { }

  get(id: number): Observable<User> {
    return this.http.get<User>(`${BASE_URL}/users/${id}`);
  }
  
}
