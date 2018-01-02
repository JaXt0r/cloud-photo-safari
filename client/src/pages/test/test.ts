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
      transition('false => true', animate('1000ms ease-in')),
      transition('true => false', animate('1000ms ease-out'))
    ])
  ]
})
export class TestPage implements OnInit {

  private heroState: boolean = true;

  @ViewChild('background1') background1: any;
  @ViewChild('background2') background2: any;
  private currentBackground: any;
  private currentFolder: any;


  constructor(
    public navCtrl: NavController,
    public alertCtrl: ActionSheetController, private modalCtrl: ModalController
  ) {}

  ngOnInit() {

  }

  toggleState() {
    this.heroState = !this.heroState;
    console.log(this.heroState);
  }
}
