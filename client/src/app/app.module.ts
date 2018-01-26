import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FolderSwitcher } from '../pages/home/folderSwitcher/folderSwitcher';

import { SettingsPage, TabSettings, TabFolder } from '../pages/settings/settings';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Services
import { RestService } from '../services/restService';
import { AnimationService } from '../pages/home/services/animationService';
import { CallbackService } from '../pages/home/services/callbackService';
import { HomeModel } from '../pages/home/models/homeModel';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FolderSwitcher,
    SettingsPage,
    TabSettings,
    TabFolder
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FolderSwitcher,
    SettingsPage,
    TabSettings,
    TabFolder
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestService,
    AnimationService, CallbackService, HomeModel
  ]
})
export class AppModule {}
