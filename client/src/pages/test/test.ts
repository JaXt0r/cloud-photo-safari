import { Component, ViewChild, OnInit } from '@angular/core';
import { Events, NavController, ActionSheetController, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-test',
  templateUrl: 'test.html'
})
export class TestPage implements OnInit {

  @ViewChild('background1') background1: any;
  @ViewChild('background2') background2: any;
  private currentBackground: any;
  private currentFolder: any;


  constructor(
    public navCtrl: NavController,
    public alertCtrl: ActionSheetController, private modalCtrl: ModalController,
    private events: Events
  ) {}

  ngOnInit() {

  }

}
