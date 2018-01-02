import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, ActionSheetController, ModalController } from 'ionic-angular';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
  animations: [
    trigger('heroState', [
      state('false', style({
        transform: 'translateX(-100%)',
        opacity: '0'
      })),
      state('true', style({
        transform: 'translateX(0)',
        opacity: '1'
      })),
      transition('false => true', animate('1000ms')),
      transition('true => false', animate('1000ms'))
    ]),
    trigger('heroState2', [
      state('false', style({
        transform: 'translateX(0)',
        opacity: '1'
      })),
      state('true', style({
        transform: 'translateX(100%)',
        opacity: '0'
      })),
      transition('true => false', animate('1000ms')),
      transition('false => true', animate('1000ms'))
    ])
  ]
})
export class TestPage implements OnInit {

  private heroState: boolean = true;
  private heroState2: boolean = true;

  @ViewChild('background1') background1: any;
  @ViewChild('background2') background2: any;
  private currentBackground: any;


  constructor(
    public navCtrl: NavController,
    public alertCtrl: ActionSheetController, private modalCtrl: ModalController
  ) {}

  ngOnInit() {

  }

  toggleState() {
    this.heroState = !this.heroState;
    this.heroState2 = !this.heroState2;
  }
}
