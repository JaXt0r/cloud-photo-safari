import { Component, OnInit } from '@angular/core';
import { NavController, Events } from 'ionic-angular';

import { SettingsModel } from '../../models/settingsModel';



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
  hibernates = [[0, 1], [1, 2]]
  days = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]


  constructor(private settingsModel: SettingsModel, private events: Events) { }


  ngOnInit() {
    this.imageFrequency = this.settingsModel.getImageFrequency();
  }


  public imageFrequencyChanged() {
    this.settingsModel.setImageFrequency(this.imageFrequency);

    this.events.publish('settingsPage.imageFrequencyChanged');
  }

  onAddHibernate() {
    this.hibernates.push([]);
  }

  onRemoveHibernate(index) {
    this.hibernates.splice(index, 1);
  }


}



@Component({
  templateUrl: 'tabFolder.html'
})
export class TabFolder {

  constructor(public navCtrl: NavController) {}

}
