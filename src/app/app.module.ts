import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {WavetrophyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';
import {LoginPage} from "../pages/login/login";

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {ConfigProvider} from '../providers/config/config';
import {HttpProvider} from '../providers/http/http';
import {IonicStorageModule} from "@ionic/storage";
import {HttpClientModule} from "@angular/common/http";
import {BackgroundMode} from "@ionic-native/background-mode";
import { LocalNotifications } from '@ionic-native/local-notifications';
import { LocationProvider } from '../providers/location/location';
import {CacheModule, CacheService} from "ionic-cache";

@NgModule({
  declarations: [
    WavetrophyApp,
    HomePage,
    ListPage,
    LoginPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(WavetrophyApp),
    IonicStorageModule.forRoot({
      name: '__wavetrophy',
      driverOrder: ['indexeddb']
    }),
    CacheModule.forRoot({
      keyPrefix: '__httpcache'
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    WavetrophyApp,
    HomePage,
    ListPage,
    LoginPage,
  ],
  providers: [
    HttpProvider,
    ConfigProvider,
    StatusBar,
    SplashScreen,
    BackgroundMode,
    LocalNotifications,
    {
      provide: APP_INITIALIZER,
      useFactory: configServiceFactory,
      deps: [ConfigProvider],
      multi: true,
    },
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocationProvider,
  ]
})
export class AppModule {
}

export function configServiceFactory(config: ConfigProvider) {
  return () => config.loadConfig();
}
