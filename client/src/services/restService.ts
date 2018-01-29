import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RestService {

  apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getHealth() {
    return this.http.get(this.apiUrl+'/health');
  }

  getPhotosets() {
    return this.http.get(this.apiUrl+'/photoset/list');
  }

  getRandomPhoto(photosetId: String) {
    return this.http.get(`${this.apiUrl}/photoset/randomPhoto/${photosetId}`)
  }

}
