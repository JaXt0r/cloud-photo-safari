import { Component, OnInit } from '@angular/core';
import { NavController, Events } from 'ionic-angular';

import { SettingsModel, SleepModeSetting } from '../../models/settingsModel';



@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  settingsRoot: any = TabSettings;
  folderRoot:   any = TabFolder;


  constructor() { }

  
}



@Component({
  templateUrl: 'tabSettings.html'
})
export class TabSettings implements OnInit {

  private imageFrequency: any; 
  sleepModes: Array<SleepModeSetting>;

  // Index according to JavaScript's getDay() method.
  days = [{i:1, n:"Mo"}, {i:2, n:"Di"}, {i:3, n:"Mi"}, {i:4, n:"Do"}, {i:5 ,n:"Fr"}, {i:6, n: "Sa"}, {i: 0, n: "So"}]


  constructor(private settingsModel: SettingsModel, private events: Events) { }


  ngOnInit() {
    this.imageFrequency = this.settingsModel.getImageFrequency();
    this.sleepModes     = this.settingsModel.getSleepModes();
  }


  public imageFrequencyChanged() {
    this.settingsModel.setImageFrequency(this.imageFrequency);

    this.events.publish('settingsPage.imageFrequencyChanged');
  }


  /**
   * Save any change back to settingsModel.
   */
  sleepModeAltered() {
    this.settingsModel.setSleepModes(this.sleepModes);
  }

  onAddSleepMode() {
    this.sleepModes.push(new SleepModeSetting());
    this.sleepModeAltered();
  }

  onRemoveSleepMode(index) {
    this.sleepModes.splice(index, 1);
    this.sleepModeAltered();
  }


}



@Component({
  templateUrl: 'tabFolder.html'
})
export class TabFolder {

  constructor(public navCtrl: NavController) {}

}
