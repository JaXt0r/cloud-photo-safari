import { Component, ViewChild, OnInit } from '@angular/core';
import { Events, NavController, ActionSheetController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {TimerObservable} from "rxjs/observable/TimerObservable";

import { RestService } from '../../services/restService';
import { AnimationService } from '../../services/animationService';
import { FolderSwitcher } from './folderSwitcher/folderSwitcher';
import { SettingsPage } from '../settings/settings';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  @ViewChild('background1') background1: any;
  @ViewChild('background2') background2: any;
  private currentBackground: any;
  private currentFolder: any;
  private paused: boolean = false;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: ActionSheetController, private modalCtrl: ModalController,
    private rest: RestService, private events: Events,
    private animationService: AnimationService,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.animationService.init(this.currentBackground, this.currentFolder, this.background1, this.background2);

    this.storage.get('folder').then((val) => {
      this.currentFolder = val;
    });
    
    this.currentBackground = this.background1;

    let timer = TimerObservable.create(5000, 10000);
     timer.subscribe((t) => this.timerCallback(t));

     this.events.subscribe('useFolder', (folder) => {
       this.currentFolder = folder;
       this.storage.set('folder', folder);
      });
  }


  timerCallback(t: number) {
    console.log('currentFolder', this.currentFolder);
    if (null !== this.currentFolder && undefined !== this.currentFolder && !this.paused) {
      this.paused = true;
      this.rest.getRandomPhoto(this.currentFolder.id).subscribe((photo) => this.randomPhotoCallback(photo));
    }
  }

  randomPhotoCallback(photo: any) {
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


  displayMenu() {
    this.alertCtrl.create({
      title: 'Landschaften',
      cssClass: 'home-action-sheet-container',
      buttons: [
        {
          icon: 'settings',
          handler: () => {
            this.navCtrl.push(SettingsPage);
          }
        },
        {
          icon: 'folder-open',
          handler: () => {
            let folderModal = this.modalCtrl.create(FolderSwitcher);
            folderModal.present();
          }
        },
        {
          icon: 'shuffle'
        },
        {
          icon: 'pause'
        },
        {
          icon: 'skip-backward'
        },
        {
          icon: 'skip-forward'
        },
        {
          icon: 'copy'
        },
        {
          icon: 'move'
        },
        {
          icon: 'trash'
        }
      ]
    }).present();
  }


  togglePhoto() {
    this.animationService.togglePhoto();
  }

}
