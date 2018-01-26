import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, ActionSheetController, ModalController } from 'ionic-angular';

import { AnimationService } from '../../services/animationService';
import { CallbackService } from '../../services/callbackService';

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
    private animationService: AnimationService,
    private callbackService: CallbackService
  ) {}

  ngOnInit() {
    this.currentBackground = this.background1;

    this.animationService.init(this.currentBackground, this.currentFolder, this.background1, this.background2);
    this.callbackService.init(this.currentBackground, this.currentFolder, this.background1, this.background2);
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
