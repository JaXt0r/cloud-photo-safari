import { Injectable, OnInit } from '@angular/core';
import { Events } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { RestService } from './restService';
import { AnimationService } from './animationService';
import {TimerObservable} from "rxjs/observable/TimerObservable";


@Injectable()
export class CallbackService implements OnInit {


  private currentBackground: any;
  private currentFolder: any;
  private background1: any;
  private background2: any;
  private paused: boolean = false;


  public constructor(private rest: RestService, private animationService: AnimationService,
    private storage: Storage, private events: Events) {

  }

  ngOnInit() {
    this.storage.get('folder').then((val) => {
      this.currentFolder = val;
    });
  }
    
  public init(currentBackground: any, currentFolder: any, background1: any, background2: any) {
    this.currentBackground = currentBackground;
    this.currentFolder = currentFolder;
    this.background1 = background1;
    this.background2 = background2;

    this.start();
  }


    private start() {
      let timer = TimerObservable.create(5000, 10000);
      timer.subscribe((t) => this.timerCallback(t));
 
      this.events.subscribe('useFolder', (folder) => {
        this.currentFolder = folder;
        this.storage.set('folder', folder);
       });
    }


    private timerCallback(t: number) {
      console.log('currentFolder', this.currentFolder);
      if (null !== this.currentFolder && undefined !== this.currentFolder && !this.paused) {
        this.paused = true;
        this.rest.getRandomPhoto(this.currentFolder.id).subscribe((photo) => this.randomPhotoCallback(photo));
      }
    }
  

    private randomPhotoCallback(photo: any) {
      console.log('newImage', `url('${photo.urls.original}')`, photo.urls.original);
  
      this.currentBackground = (this.currentBackground==this.background1) ? this.background2 : this.background1;
  
      var bgImg = new Image();
      bgImg.onload = () => {
         this.currentBackground.nativeElement.style.backgroundImage = `url('${photo.urls.medium}')`;
         this.togglePhoto();
         this.paused = false;
      };
      bgImg.onerror = () => {
        this.paused = false;
      }
  
      bgImg.src = photo.urls.medium;
    }

    
    private togglePhoto() {
      this.animationService.togglePhoto();
    }  
}