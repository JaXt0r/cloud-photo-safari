import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { RestService } from '../../../services/restService';
import { AnimationService } from './animationService';

import { HomeModel } from '../../../models/homeModel';
import { SettingsModel } from '../../../models/settingsModel';

import { TimerObservable } from "rxjs/observable/TimerObservable";
import { Subscription } from "rxjs/Subscription";


@Injectable()
export class CallbackService {

  private imageTimerSubscription: Subscription;


  public constructor(private rest: RestService, private animationService: AnimationService,
    private model: HomeModel, private settingsModel: SettingsModel,
    private storage: Storage, private events: Events
  ) {
    this.events.subscribe('home.changeImageFolder', (folder) => {
      this.model.currentFolder = folder;
      this.storage.set('home.imageFolder', folder);

      this.start();
    });

    this.events.subscribe('settingsPage.imageFrequencyChanged', () => { this.start() });
  }


  public init() {
    this.storage.get('home.imageFolder').then((val) => {
      this.model.currentFolder = val;

      if (val !== null && val !== undefined) {
        this.start();
      }
    });
  }


  /**
   * (re)start image timer.
   */
  private start() {
    this.stop();

    console.log('new timer starting with', this.settingsModel.getImageFrequency());
    let timer = TimerObservable.create(0, this.settingsModel.getImageFrequency());
    this.imageTimerSubscription = timer.subscribe(() => this.timerCallback());
  }


  /**
   * Stop image timer for the moment.
   */
  private stop() {
    if (this.imageTimerSubscription instanceof Subscription) {
      this.imageTimerSubscription.unsubscribe();
    }    
  }

  private timerCallback() {
    console.log('currentFolder', this.model.currentFolder);
    if (null !== this.model.currentFolder && undefined !== this.model.currentFolder && !this.model.paused) {
      this.model.paused = true;
      this.rest.getRandomPhoto(this.model.currentFolder.id).subscribe((photo) => this.randomPhotoCallback(photo));
    }
  }
  

  /**
   * Preload photo so that it can be loaded smoothely afterwards.
   * @param photo 
   */
  private randomPhotoCallback(photo: any) {
    let imageURL = photo.sizes.large_1600.url;

    console.log('newImage', imageURL);

    this.model.currentBackground = (this.model.currentBackground==this.model.background1) ? this.model.background2 : this.model.background1;

    var bgImg = new Image();
    bgImg.onload = () => {
        this.model.currentBackground.nativeElement.style.backgroundImage = `url('${imageURL}')`;
        this.togglePhoto();
        this.model.paused = false;
    };
    bgImg.onerror = () => {
      this.model.paused = false;
    }

    bgImg.src = imageURL;
  }

    
  private togglePhoto() {
    this.animationService.togglePhoto();
  }  
}