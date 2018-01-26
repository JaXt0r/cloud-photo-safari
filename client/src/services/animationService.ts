import { Injectable } from '@angular/core';


import { AnimationBuilder, AnimationPlayer } from '@angular/animations';
import { style, animate } from '@angular/animations';


@Injectable()
export class AnimationService {

    private currentBackground: any;
    private currentFolder: any;
    private background1: any;
    private background2: any;

    private photoState: number = 0;

    private anim11: AnimationPlayer;
    private anim12: AnimationPlayer;
    private anim21: AnimationPlayer;
    private anim22: AnimationPlayer;
  
    
    constructor(private animationBuilder: AnimationBuilder) {}


    public init(currentBackground: any, currentFolder: any, background1: any, background2: any) {
      this.currentBackground = currentBackground;
      this.currentFolder = currentFolder;
      this.background1 = background1;
      this.background2 = background2;
    }
    

    public togglePhoto() {
      this.createAnimations();
  
      switch (this.photoState) {
        case 0:
        this.anim11.play();
        this.anim21.play();
        ++this.photoState;
        return;
        case 1:
        this.anim12.play();
        this.anim22.play();
        this.photoState = 0;
        return;
      }
    }

  
    private createAnimations() {
      const duration = 1000;
  
      var builder = this.animationBuilder;
      var bg1 = this.background1.nativeElement;
      var bg2 = this.background2.nativeElement;
  
      this.anim11 = builder.build([
        animate(duration, style({opacity: 0}))
      ]).create(bg1);
      this.anim12 = builder.build([
        animate(duration, style({opacity: 1}))
      ]).create(bg1);
  
      this.anim21 = builder.build([
        animate(duration, style({opacity: 1}))
      ]).create(bg2);
      this.anim22 = builder.build([
        animate(duration, style({opacity: 0}))
      ]).create(bg2);
  
      this.anim11.onDone(() => {
        bg1.style.opacity = 0;
        this.anim11.destroy();
      });
      this.anim12.onDone(() => {
        bg1.style.opacity = 1;
        this.anim12.destroy();
      });
      this.anim21.onDone(() => {
        bg2.style.opacity = 1;
        this.anim21.destroy();
      });
      this.anim22.onDone(() => {
        bg2.style.opacity = 0;
        this.anim22.destroy();
      });
    }

}