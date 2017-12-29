import { Component } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public alertCtrl: ActionSheetController) {

  }



  displayMenu() {
      let actionSheet = this.alertCtrl.create({
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
            icon: 'folder-open'
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
      });

      actionSheet.present();

    }
}
