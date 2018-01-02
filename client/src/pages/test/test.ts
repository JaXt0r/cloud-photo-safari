import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, ActionSheetController, ModalController } from 'ionic-angular';

import { AnimationBuilder, AnimationPlayer } from '@angular/animations';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'page-test',
  templateUrl: 'test.html'
/*  animations: [
    trigger('heroState', [
      state('false', style({
        opacity: '0'
      })),
      state('true', style({
        opacity: '1'
      })),
      transition('false => true', animate('1000ms')),
      transition('true => false', animate('1000ms'))
    ]),
    trigger('heroState2', [
      state('false', style({
        opacity: '1'
      })),
      state('true', style({
        opacity: '0'
      })),
      transition('true => false', animate('1000ms')),
      transition('false => true', animate('1000ms'))
    ])
  ]*/
})
export class TestPage implements OnInit {

  private state: number = 0;

  @ViewChild('background1') background1: any;
  @ViewChild('background2') background2: any;
  private currentBackground: any;

  private anim11: AnimationPlayer;
  private anim12: AnimationPlayer;
  private anim21: AnimationPlayer;
  private anim22: AnimationPlayer;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: ActionSheetController, private modalCtrl: ModalController,
    private animationBuilder: AnimationBuilder
  ) {}

  ngOnInit() {
  }

  createAnimations() {
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

  toggleState() {
    this.createAnimations();

    switch (this.state) {
      case 0:
      this.anim11.play();
      this.anim21.play();
      ++this.state;
      return;
      case 1:
      this.anim12.play();
      this.anim22.play();
      this.state = 0;
      return;
    }
  }
}
