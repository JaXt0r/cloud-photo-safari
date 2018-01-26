import { Injectable, OnInit } from '@angular/core';
import { Events } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { RestService } from '../../../services/restService';
import { AnimationService } from './animationService';

import { HomeModel } from '../../../models/homeModel';
import {TimerObservable} from "rxjs/observable/TimerObservable";


@Injectable()
export class CallbackService implements OnInit {

  public constructor(private rest: RestService, private animationService: AnimationService, private model: HomeModel,
    private storage: Storage, private events: Events) {

  }

  ngOnInit() {
    this.storage.get('folder').then((val) => {
      this.model.currentFolder = val;
    });
  }


  public start() {
    // Initial call
    this.timerCallback();

    let timer = TimerObservable.create(5000, 10000);
    timer.subscribe(() => this.timerCallback());

    this.events.subscribe('useFolder', (folder) => {
      this.model.currentFolder = folder;
      this.storage.set('folder', folder);
    });
  }


  private timerCallback() {
    console.log('currentFolder', this.model.currentFolder);
    if (null !== this.model.currentFolder && undefined !== this.model.currentFolder && !this.model.paused) {
      this.model.paused = true;
      this.rest.getRandomPhoto(this.model.currentFolder.id).subscribe((photo) => this.randomPhotoCallback(photo));
    }
  }
  

  private randomPhotoCallback(photo: any) {
    console.log('newImage', `url('${photo.urls.original}')`, photo.urls.original);

    this.model.currentBackground = (this.model.currentBackground==this.model.background1) ? this.model.background2 : this.model.background1;

    var bgImg = new Image();
    bgImg.onload = () => {
        this.model.currentBackground.nativeElement.style.backgroundImage = `url('${photo.urls.medium}')`;
        this.togglePhoto();
        this.model.paused = false;
    };
    bgImg.onerror = () => {
      this.model.paused = false;
    }

    bgImg.src = photo.urls.medium;
  }

    
  private togglePhoto() {
    this.animationService.togglePhoto();
  }  
}