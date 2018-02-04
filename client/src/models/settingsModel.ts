import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class SettingsModel {

  private imageFrequency: number = 10000;
  private sleepModes: Array<SleepModeSetting> = [];


  public constructor(private storage: Storage) {
    this.storage.get('settings.imageFrequency').then((val) => {
      if (null !== val) {
        this.imageFrequency = val
      }
    });

    this.storage.get('settings.sleepModes').then((val) => {
      if (null !== val) {
        this.sleepModes = val
      }
    });    
  }


  public getImageFrequency(): number { return this.imageFrequency }
  public setImageFrequency(frequency: number) {
    this.imageFrequency = frequency;
    this.storage.set('settings.imageFrequency', frequency);
  }


  public getSleepModes(): Array<SleepModeSetting> { return this.sleepModes }
  public setSleepModes(sleepModes: Array<SleepModeSetting>) {
    this.sleepModes = sleepModes;
    this.storage.set('settings.sleepModes', sleepModes);
  }
}



export class SleepModeSetting {
  weekdays: Uint16Array;
  from: string = "sdf";
  to: string;
}