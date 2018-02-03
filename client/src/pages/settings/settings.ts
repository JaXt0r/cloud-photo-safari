import { Component, OnInit } from '@angular/core';
import { NavController, Events } from 'ionic-angular';

import { SettingsModel, HibernateSetting } from '../../models/settingsModel';



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
  hibernates: Array<HibernateSetting>;
  days = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]


  constructor(private settingsModel: SettingsModel, private events: Events) { }


  ngOnInit() {
    this.imageFrequency = this.settingsModel.getImageFrequency();
    this.hibernates     = this.settingsModel.getHibernates();
  }


  public imageFrequencyChanged() {
    this.settingsModel.setImageFrequency(this.imageFrequency);

    this.events.publish('settingsPage.imageFrequencyChanged');
  }


  /**
   * Save any change back to settingsModel.
   */
  hibernateAltered() {
    this.settingsModel.setHibernates(this.hibernates);
  }

  onAddHibernate() {
    this.hibernates.push(new HibernateSetting());
    this.hibernateAltered();
  }

  onRemoveHibernate(index) {
    this.hibernates.splice(index, 1);
    this.hibernateAltered();
  }


}



@Component({
  templateUrl: 'tabFolder.html'
})
export class TabFolder {

  constructor(public navCtrl: NavController) {}

}
