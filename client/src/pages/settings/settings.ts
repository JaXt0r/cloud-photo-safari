import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  settingsRoot: any = TabSettings;
  folderRoot:   any = TabFolder;


  constructor(public navCtrl: NavController) {

  }

}

@Component({
  templateUrl: 'tabSettings.html'
})
export class TabSettings {

  constructor(public navCtrl: NavController) {}

}

@Component({
  templateUrl: 'tabFolder.html'
})
export class TabFolder {

  constructor(public navCtrl: NavController) {}

}
