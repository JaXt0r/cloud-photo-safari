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
    });

    this.events.subscribe('settingsPage.imageFrequencyChanged', () => { this.restart() });

    this.storage.get('home.imageFolder').then((val) => {
      this.model.currentFolder = val;
      this.start();
    });
  }


  /**
   * Yes, this method does nothing, but! it is needed for injection (without no-use warning) and instanciation inside parent class.
   * 
   */
  public init() {
    // NO OP
  }

  private restart() {
    this.imageTimerSubscription.unsubscribe();

    this.start();
  }

  private start() {
    console.log('new timer starting with', this.settingsModel.imageFrequency);
    let timer = TimerObservable.create(0, this.settingsModel.imageFrequency);
    this.imageTimerSubscription = timer.subscribe(() => this.timerCallback());
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