import { Component, ViewChild, OnInit } from '@angular/core';
import { Events, NavController, ActionSheetController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {TimerObservable} from "rxjs/observable/TimerObservable";

import { AnimationBuilder, AnimationPlayer } from '@angular/animations';
import { style, animate } from '@angular/animations';

import { RestService } from '../../services/restService';

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
    private animationBuilder: AnimationBuilder,
    private storage: Storage
  ) {}

  ngOnInit() {
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


  private photoState: number = 0;

  private anim11: AnimationPlayer;
  private anim12: AnimationPlayer;
  private anim21: AnimationPlayer;
  private anim22: AnimationPlayer;


  createAnimations() {
    const duration = 1000;

    var builder = this.animationBuilder;
    var bg1 = this.background1.nativeElement;
    var bg2 = this.background2.nativeElement;

    this.anim11 = builder.build([
      animate(duration, style({opacity: 0}))
    ]).create(bg1);
    this.anim12 = builder.build([
      animate(duration, style({opacity: 1}))
    ]).create(bg1);

    this.anim21 = builder.build([
      animate(duration, style({opacity: 1}))
    ]).create(bg2);
    this.anim22 = builder.build([
      animate(duration, style({opacity: 0}))
    ]).create(bg2);

    this.anim11.onDone(() => {
      bg1.style.opacity = 0;
      this.anim11.destroy();
    });
    this.anim12.onDone(() => {
      bg1.style.opacity = 1;
      this.anim12.destroy();
    });
    this.anim21.onDone(() => {
      bg2.style.opacity = 1;
      this.anim21.destroy();
    });
    this.anim22.onDone(() => {
      bg2.style.opacity = 0;
      this.anim22.destroy();
    });
  }


  togglePhoto() {
    this.createAnimations();

    switch (this.photoState) {
      case 0:
      this.anim11.play();
      this.anim21.play();
      ++this.photoState;
      return;
      case 1:
      this.anim12.play();
      this.anim22.play();
      this.photoState = 0;
      return;
    }
  }
}
