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

  private HIBERNATE_IMAGE = {sizes: {large_1600: {url: '/assets/imgs/logo.png'}}};

  private imageTimerSubscription: Subscription;
  private hibernateTimerSubscription: Subscription;


  public constructor(private rest: RestService, private animationService: AnimationService,
    private homeModel: HomeModel, private settingsModel: SettingsModel,
    private storage: Storage, private events: Events
  ) {
    this.events.subscribe('home.changeImageFolder', (folder) => {
      this.homeModel.currentFolder = folder;
      this.storage.set('home.imageFolder', folder);

      this.start();
    });

    this.events.subscribe('settingsPage.imageFrequencyChanged', () => { this.start() });

    // Let some timeout to ensure, that settingsModel already filled its values.
    this.hibernateTimerSubscription = TimerObservable.create(1000, 5000).subscribe(() => this.hibernateTimerCallback());
  }


  public init() {
    this.storage.get('home.imageFolder').then((val) => {
      this.homeModel.currentFolder = val;

      if (val !== null && val !== undefined) {
        this.start();
      }
    });
  }


  /**
   * (re)start image timer.
   */
  private start() {
    this.homeModel.hibernated = true;

    // No double start!
    if (this.imageTimerSubscription instanceof Subscription) {
      this.imageTimerSubscription.unsubscribe();
    }

    let timer = TimerObservable.create(0, this.settingsModel.getImageFrequency());
    this.imageTimerSubscription = timer.subscribe(() => this.timerCallback());
  }


  /**
   * Stop image timer for the moment.
   */
  private stop() {
    this.homeModel.hibernated = false;

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

    if (isHibernate && this.homeModel.hibernated) {
      console.log('start hibernate');
      this.stop();
      this.randomPhotoCallback(this.HIBERNATE_IMAGE);
    } else if (!isHibernate && !this.homeModel.hibernated) {
      console.log('end hibernate');
      this.start();
    }
  }



  private timerCallback() {
    if (null !== this.homeModel.currentFolder && undefined !== this.homeModel.currentFolder && !this.homeModel.paused) {
      this.homeModel.paused = true;
      this.rest.getRandomPhoto(this.homeModel.currentFolder.id).subscribe((photo) => this.randomPhotoCallback(photo));
    }
  }
  

  /**
   * Preload photo so that it can be loaded smoothely afterwards.
   * @param photo 
   */
  private randomPhotoCallback(photo: any) {
    let imageURL = photo.sizes.large_1600.url;
    this.homeModel.currentBackground = (this.homeModel.currentBackground==this.homeModel.background1) ? this.homeModel.background2 : this.homeModel.background1;

    var bgImg = new Image();
    bgImg.onload = () => {
        this.homeModel.currentBackground.nativeElement.style.backgroundImage = `url('${imageURL}')`;
        this.animationService.togglePhoto();
        this.homeModel.paused = false;
    };
    bgImg.onerror = () => {
      this.homeModel.paused = false;
    }

    bgImg.src = imageURL;
  }
}