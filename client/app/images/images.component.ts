import { Component, OnInit } from '@angular/core';
import { ImagesService } from './images.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
  // instantiate posts to an empty array
  image: any = [];

  constructor(private imagesService: ImagesService) { }

  ngOnInit() {
    // Retrieve posts from the API
    this.imagesService.switchImage().subscribe(image => {
      this.image = image;
    });
  }
}
