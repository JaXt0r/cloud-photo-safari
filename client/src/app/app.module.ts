import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FolderSwitcher } from '../pages/home/folderSwitcher/folderSwitcher';

import { SettingsPage, TabSettings, TabFolder } from '../pages/settings/settings';

import { TestPage } from '../pages/test/test';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { RestService } from '../services/restService';


@NgModule({
  declarations: [
    MyApp,
    // HomePage
    HomePage,
    FolderSwitcher,
    // SettingsPage
    SettingsPage,
    TabSettings,
    TabFolder,
    TestPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    BrowserAnimationsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // HomePage
    HomePage,
    FolderSwitcher,
    // SettingsPage
    SettingsPage,
    TabSettings,
    TabFolder,
    TestPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestService
  ]
})
export class AppModule {}
