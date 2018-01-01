import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, ActionSheetController, ModalController } from 'ionic-angular';
import {TimerObservable} from "rxjs/observable/TimerObservable";

import { RestService } from '../../services/restService';

import { FolderSwitcher } from './folderSwitcher/folderSwitcher';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  @ViewChild('background') background: any;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: ActionSheetController, private modalCtrl: ModalController,
    private rest: RestService
  ) {}

  ngOnInit() {
    let timer = TimerObservable.create(2000, 5000);
     timer.subscribe(t => {
       this.rest.getRandomPhoto("72157690844086705").subscribe((photo) => {
         this.background._elementRef.nativeElement.style.background = `url(${(photo as any).urls.original}) no-repeat center top fixed`;
       });
     });

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
