import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class SettingsModel {

  private imageFrequency: number = 10000;

  public constructor(private storage: Storage) {
    
    this.storage.get('settings.imageFrequency').then((val) => {
      if (null !== val) {
        this.imageFrequency = val
      }
    });
    
  }


  public getImageFrequency(): number { return this.imageFrequency }
  public setImageFrequency(frequency: number) {
    this.imageFrequency = frequency;
    this.storage.set('settings.imageFrequency', frequency);
  }
}