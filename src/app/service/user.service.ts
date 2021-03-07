import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  apiURL = environment.APIURL;
  constructor(private http: HttpClient) { }

  register(user: User) {
    console.log(user);
      return this.http.post(`${this.apiURL}/users/api/register`, user);
  }
}
