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
  private hibernateTimerSubscription: Subscription;


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

    // Let some timeout to ensure, that settingsModel already filled its values.
    this.hibernateTimerSubscription = TimerObservable.create(1000, 5000).subscribe(() => this.hibernateTimerCallback());
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


  /**
   * Check if image display should be paused at this time.
   * 
   * Attention: All checks are made local sensitive.
   *  (Should be ok, because setTime and compareTime will be in same browser only)
   */
  private hibernateTimerCallback() {
    let isHibernate = this.settingsModel.getHibernates().some(h => {
      let now = new Date();

      if (!h.weekdays || !h.from || !h.to) {
        return false;
      }

      let isCurrentDay = h.weekdays.some(d => now.getDay() == d);
      if (!isCurrentDay) {
        return false;
      }

      ``
      let current = new Date(`01/01/2001 ${now.getHours()}:${now.getMinutes()}:00`).getTime();
      let from    = new Date(`01/01/2001 ${h.from}:00`).getTime();
      let to      = new Date(`01/01/2001 ${h.to}:00`).getTime();

      if (current >= from && current < to) {
        return true;
      }

      return false;
    });

    if (isHibernate) {
      this.stop();
    }
  }



  private timerCallback() {
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
        this.animationService.togglePhoto();
        this.model.paused = false;
    };
    bgImg.onerror = () => {
      this.model.paused = false;
    }

    bgImg.src = imageURL;
  }
}