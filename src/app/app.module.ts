import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { RESTService } from './services/RESTService';
import { ServersPage } from '../pages/servers/servers';
import { AddServersPage } from '../pages/add-servers/add-servers';
import { ServerDetailsPage } from '../pages/server-details/server-details';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { SavedDataService } from './services/SavedDataService';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddServersPage,
    ServersPage,
    TabsPage,
    ServerDetailsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddServersPage,
    ServersPage,
    TabsPage,
    ServerDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    RESTService,
    SavedDataService,
    HttpModule,
    IonicStorageModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler, deps: [Storage]}
  ]
})
export class AppModule {}
