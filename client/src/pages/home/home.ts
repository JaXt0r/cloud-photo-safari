import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, ActionSheetController, ModalController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { HomeModel } from '../../models/homeModel';
import { CallbackService } from './services/callbackService';

import { FolderSwitcher } from './folderSwitcher/folderSwitcher';
import { SettingsPage } from '../settings/settings';

import { RestService } from '../../services/restService';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  @ViewChild('background1') background1: any;
  @ViewChild('background2') background2: any;
  @ViewChild('sleepModeBg') sleepModeBg: any;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: ActionSheetController, private modalCtrl: ModalController, private loadingCtrl: LoadingController,
    private callbackService: CallbackService, private restService: RestService,
    private homeModel: HomeModel, private storage: Storage
  ) {}


  loading = this.loadingCtrl.create({
    spinner: 'crescent',
    content: 'Starte Fotosafari...',
  });


  ngOnInit() {
    this.waitForBackend();

    this.storage.get('home.menu').then((val) => {
      if (val !== null && val !== undefined) {
        this.homeModel.menu = val;
      }
    });
  }

  /**
   * Loading during startup.
   */
  private waitForBackend() {
    this.restService.getHealth().subscribe((response: any) => {
      if (response && response.status === 'UP') {
        this.homeModel.init(this.background1, this.background1, this.background2, this.sleepModeBg);
        this.callbackService.init();

        this.loading.dismiss();
      } else {
        this.loading.present();

        // Wait another 3 seconds.
        setTimeout(() => {this.waitForBackend()}, 3000);
      }  
    },
    // Wait another 3 seconds.
    error => setTimeout(() => {
      this.loading.present();
      this.waitForBackend()}, 3000)
    );
  }


  displayMenu() {
    this.alertCtrl.create({
      title: this.homeModel.currentFolder ? this.homeModel.currentFolder.title : "[keine Auswahl]",
      cssClass: 'home-action-sheet-container',
      buttons: [
        {
          icon: 'settings',
          handler: () => {
            this.navCtrl.push(SettingsPage);
          }
        },{
          icon: 'folder-open',
          handler: () => {
            let folderModal = this.modalCtrl.create(FolderSwitcher);
            folderModal.present();
          }
        },{
          icon: 'refresh',
          handler: () => {
            window.location.reload();
          }
        },{
          icon: 'shuffle',
          cssClass: this.homeModel.menu.isShuffle ? 'menu-active' : '',
          handler: () => {
            this.homeModel.menu.isShuffle = !this.homeModel.menu.isShuffle;
            this.saveMenu();
          }
        },{
          icon: 'pause',
          cssClass: this.homeModel.menu.isPaused ? 'menu-active' : '',
          handler: () => {
            this.homeModel.menu.isPaused = !this.homeModel.menu.isPaused;
            this.saveMenu();
            this.callbackService.startOrStop();
          }
        }
        /*{
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
        }*/
      ]
    }).present();
  }

  private saveMenu() {
    this.storage.set('home.menu', this.homeModel.menu);
  }
}
