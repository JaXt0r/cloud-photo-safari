import { Component } from '@angular/core';

import { RestService } from '../../../services/restService';


@Component({
  selector: 'page-home-folderSwitcher',
  templateUrl: 'folderSwitcher.html'
})
export class FolderSwitcher {

  folders = [];

  constructor(private rest: RestService) {

    this.rest.getPhotosets().then(d => {
      this.folders = d as any[];
      console.log(d);
      this.rest.getPhotoURLs(d[0].primaryPhoto.id).then(d => {console.log(d)})
    });
  }

}
