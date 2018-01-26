import { Injectable } from '@angular/core';


@Injectable()
export class HomeModel {

  public currentBackground: any;
  public currentFolder: any;
  public background1: any;
  public background2: any;
  public paused: boolean = false;

      
  public init(currentBackground: any, background1: any, background2: any) {
    this.currentBackground = currentBackground;
    this.background1 = background1;
    this.background2 = background2;
  }
}