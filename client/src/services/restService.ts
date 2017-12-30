import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RestService {

  apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }


  getPhotosets() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/photosets/list').subscribe(data => {
        resolve(data);
      });
    });
  }

}
