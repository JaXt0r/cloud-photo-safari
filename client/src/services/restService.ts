import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RestService {

  apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }


  getPhotosets() {
    return this.http.get(this.apiUrl+'/photoset/list');
  }

  getPhotoURLs(id: String) {
    return this.http.get(`${this.apiUrl}/photo/urls/${id}`)
  }

}
