import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class SettingsModel implements OnInit {

  public changeFrequence: number = 10;

  public constructor(private storage: Storage){ }

  ngOnInit() {
    this.storage.get('changeFrequence').then((val) => {
      this.changeFrequence = val;
    });
  }
}