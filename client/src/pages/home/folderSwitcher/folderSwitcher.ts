import { Component } from '@angular/core';

import { RestService } from '../../../services/restService';


@Component({
  selector: 'page-home-folderSwitcher',
  templateUrl: 'folderSwitcher.html'
})
export class FolderSwitcher {

  folders = [];

  constructor(private rest: RestService) {
    this.rest.getPhotosets().subscribe(d => {
      this.folders = d as any[];
    });
  }

}
