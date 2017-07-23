import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ImagesService {

  constructor(private http: Http) { }

  // Get all posts from the API
  switchImage() {
    return this.http.get('/api/posts')
      .map(res => res.json());
  }
}
