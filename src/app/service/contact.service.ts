import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  apiURL = environment.APIURL;
  constructor(private http: HttpClient) { }


  contact(data) {
      return this.http.post(`${this.apiURL}/contact/api/`,data);
  }
}
