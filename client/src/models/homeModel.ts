import { Injectable } from '@angular/core';


@Injectable()
export class HomeModel {

  public currentBackground: any;
  public currentFolder: any;
  public background1: any;
  public background2: any;
  public sleepModeBg: any;
  
  public paused: boolean = false;
  public isSleepMode: boolean = false;

      
  public init(currentBackground: any, background1: any, background2: any, sleepModeBg) {
    this.currentBackground = currentBackground;
    this.background1 = background1;
    this.background2 = background2;
    this.sleepModeBg = sleepModeBg;
  }
}