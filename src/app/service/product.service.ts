import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiURL = environment.APIURL;
  constructor(private http: HttpClient) { }

  create(data) {
      let url = this.apiURL + "/product/api";
      let headers = new HttpHeaders();
      let httpOptions = {
        headers: headers,
        observe: "response" as any
      };
      var promise = this.http.post(url, data, httpOptions)
        .pipe(map((response: HttpResponse<any>) => {
          if (response.status != 200) {
            return null
          } else {
            return response
          }
        })).toPromise();
  
      return promise
    }

    getAllProducts() {
      let url = this.apiURL + "/product/api";
      let headers = new HttpHeaders();
      let httpOptions = {
        headers: headers,
        observe: "response" as any
      };
      var promise = this.http.get(url, httpOptions)
        .pipe(map((response: HttpResponse<any>) => {
          if (response.status != 200) {
            return null
          } else {
            return response
          }
        })).toPromise();
  
      return promise
    }
}
