import { Component } from '@angular/core';
import { Events, NavController } from 'ionic-angular';

import { RestService } from '../../../services/restService';


@Component({
  selector: 'page-home-folderSwitcher',
  templateUrl: 'folderSwitcher.html'
})
export class FolderSwitcher {

  folders = [];

  constructor(private navCtrl: NavController, private rest: RestService, private events: Events) {
    this.rest.getPhotosets().subscribe(d => {
      this.folders = d as any[];
    });
  }

  switchFolder(folder: any) {
    this.events.publish('useFolder', folder);
    this.navCtrl.pop();
  }

}
