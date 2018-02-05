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
  private sleepModeTimerSubscription: Subscription;


  public constructor(private rest: RestService, private animationService: AnimationService,
    private homeModel: HomeModel, private settingsModel: SettingsModel,
    private storage: Storage, private events: Events
  ) {
    this.events.subscribe('home.changeImageFolder', (folder) => {
      this.homeModel.currentFolder = folder;
      // If sequence is activated, then the next round will start with element >0<
      this.homeModel.currentFolder.currentPhotoIndex = folder.photoCount;
      this.storage.set('home.imageFolder', folder);

      this.start();
    });

    this.events.subscribe('settingsPage.imageFrequencyChanged', () => { this.start() });

    // Let some timeout to ensure, that settingsModel already filled its values.
    this.sleepModeTimerSubscription = TimerObservable.create(1000, 5000).subscribe(() => this.sleepModeTimerCallback());
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
  public start() {
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
  public stop() {
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
  private sleepModeTimerCallback() {
    let isSleepModeTime = this.settingsModel.getSleepModes().some(h => {
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

    if (isSleepModeTime && !this.homeModel.isSleepMode) {
      console.log('start sleepMode');
      this.homeModel.isSleepMode = true;

      this.stop();
      this.animationService.startSleepMode();
    } else if (!isSleepModeTime && this.homeModel.isSleepMode) {
      this.homeModel.isSleepMode = false;

      console.log('end sleepMode');
      this.start();
      this.animationService.endSleepMode();
    }
  }



  private timerCallback() {
    if (this.homeModel.menu.isPaused) {
      // Easiest way to disable callback: when its called. So we don't need to secure every external button or setting change. Just this callback. :-)
      this.stop();
    }

    if (null !== this.homeModel.currentFolder && undefined !== this.homeModel.currentFolder && !this.homeModel.isLoadingImage) {
      this.homeModel.isLoadingImage = true;

      if (this.homeModel.menu.isShuffle) {
        this.rest.getRandomPhoto(this.homeModel.currentFolder.id, this.homeModel.currentFolder.currentPhotoIndex).subscribe(
          (photo) => this.photoCallback(photo),
          () => this.homeModel.isLoadingImage = false
        );
      } else {
        this.rest.getNextPhoto(this.homeModel.currentFolder.id, this.homeModel.currentFolder.currentPhotoIndex).subscribe(
          (photo) => this.photoCallback(photo),
          () => this.homeModel.isLoadingImage = false
        );
      }
    }
  }
  

  /**
   * Preload photo so that it can be loaded smoothly afterwards.
   * @param photo 
   */
  private photoCallback(photo: any) {
    let imageURL = photo.sizes.large_1600.url;
    this.homeModel.currentBackground = (this.homeModel.currentBackground==this.homeModel.background1) ? this.homeModel.background2 : this.homeModel.background1;
    this.homeModel.currentFolder.currentPhotoIndex = photo.photosetIndex;

    // Must be set every time we change the currentPhotoIndex.
    this.storage.set('home.imageFolder', this.homeModel.currentFolder);


    var bgImg = new Image();
    bgImg.onload = () => {
        this.homeModel.currentBackground.nativeElement.style.backgroundImage = `url('${imageURL}')`;
        this.animationService.togglePhoto();
        this.homeModel.isLoadingImage = false;
    };
    bgImg.onerror = () => {
      this.homeModel.isLoadingImage = false;
    }

    bgImg.src = imageURL;
  }
}