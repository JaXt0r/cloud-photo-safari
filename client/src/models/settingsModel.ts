import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class SettingsModel implements OnInit {

  public imageFrequency: number = 10000;

  public constructor(private storage: Storage){ }

  ngOnInit() {
    this.storage.get('settings.imageFrequency').then((val) => {
      this.imageFrequency = val;
    });
  }
}