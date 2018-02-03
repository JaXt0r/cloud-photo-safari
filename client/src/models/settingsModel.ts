import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class SettingsModel {

  private imageFrequency: number = 10000;
  private hibernates: Array<HibernateSetting> = [];


  public constructor(private storage: Storage) {
    this.storage.get('settings.imageFrequency').then((val) => {
      if (null !== val) {
        this.imageFrequency = val
      }
    });

    this.storage.get('settings.hibernates').then((val) => {
      if (null !== val) {
        this.hibernates = val
      }
    });    
  }


  public getImageFrequency(): number { return this.imageFrequency }
  public setImageFrequency(frequency: number) {
    this.imageFrequency = frequency;
    this.storage.set('settings.imageFrequency', frequency);
  }


  public getHibernates(): Array<HibernateSetting> { return this.hibernates }
  public setHibernates(hibernates: Array<HibernateSetting>) {
    this.hibernates = hibernates;
    this.storage.set('settings.hibernates', hibernates);
  }
}



export class HibernateSetting {
  weekdays: Array<String>;
  from: string = "sdf";
  to: string;
}