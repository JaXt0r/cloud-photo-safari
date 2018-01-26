import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, ActionSheetController, ModalController } from 'ionic-angular';

import { HomeModel } from '../../models/homeModel';
import { CallbackService } from './services/callbackService';

import { FolderSwitcher } from './folderSwitcher/folderSwitcher';
import { SettingsPage } from '../settings/settings';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  @ViewChild('background1') background1: any;
  @ViewChild('background2') background2: any;


  constructor(
    public navCtrl: NavController,
    public alertCtrl: ActionSheetController, private modalCtrl: ModalController,
    private callbackService: CallbackService,
    private homeModel: HomeModel
  ) {}

  ngOnInit() {
    this.homeModel.init(this.background1, this.background1, this.background2);
    this.callbackService.init();
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
