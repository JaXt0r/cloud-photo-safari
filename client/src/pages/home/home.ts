import { Component, ViewChild, OnInit } from '@angular/core';
import { Events, NavController, ActionSheetController, ModalController } from 'ionic-angular';
import {TimerObservable} from "rxjs/observable/TimerObservable";

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


  constructor(
    public navCtrl: NavController,
    public alertCtrl: ActionSheetController, private modalCtrl: ModalController,
    private rest: RestService, private events: Events
  ) {}

  ngOnInit() {
    this.currentBackground = this.background1;

    let timer = TimerObservable.create(2000, 5000);
     timer.subscribe(t => {
       if (undefined !== this.currentFolder) {
         this.rest.getRandomPhoto(this.currentFolder.id).subscribe((photo) => {
           //var oldBg = this.currentBackground.nativeElement;
           //this.currentBackground = (this.currentBackground==this.background1) ? this.background2 : this.background1;
           //this.currentBackground.nativeElement.src = (photo as any).urls.original;
           //var newBg = this.currentBackground.nativeElement;
         });
       }
     });

     this.events.subscribe('useFolder', (folder) => {this.currentFolder = folder});
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
}
