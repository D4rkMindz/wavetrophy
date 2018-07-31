import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, ErrorHandler, NgModule} from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { WavetrophyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConfigProvider } from '../providers/config/config';
import { HttpProvider } from '../providers/http/http';
import {IonicStorageModule} from "@ionic/storage";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    WavetrophyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(WavetrophyApp),
    IonicStorageModule.forRoot({
      name: '__wavetrophy',
      driverOrder: ['indexeddb']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    WavetrophyApp,
    HomePage,
    ListPage
  ],
  providers: [
    HttpProvider,
    ConfigProvider,
    StatusBar,
    SplashScreen,
    {
      provide: APP_INITIALIZER,
      useFactory: configServiceFactory,
      deps: [ConfigProvider],
      multi: true,
    },
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}

function configServiceFactory(config: ConfigProvider) {
  return () => config.loadConfig();
}
