import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ImagesComponent } from './images/images.component';

import { ImagesService } from './images/images.service';


// Define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: 'images',
    pathMatch: 'full'
  },
  {
    path: 'images',
    component: ImagesComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    ImagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [ImagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
