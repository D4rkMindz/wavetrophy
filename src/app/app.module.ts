import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, ErrorHandler, Injectable, Injector, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { WavetrophyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from "../pages/login/login";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConfigProvider } from '../providers/config/config';
import { HttpProvider } from '../providers/http/http';
import { IonicStorageModule } from "@ionic/storage";
import { HttpClientModule } from "@angular/common/http";
import { BackgroundMode } from "@ionic-native/background-mode";
import { LocalNotifications } from '@ionic-native/local-notifications';
import { LocationProvider } from '../providers/location/location';
import { CacheModule } from "ionic-cache";
import { PopoverProvider } from '../providers/popover/popover';
import { SettingsPage } from "../pages/settings/settings";
import { PopoverDefaultPage } from "../pages/popover-default/popover-default";
import { FaqPage } from "../pages/faq/faq";
import { AboutPage } from "../pages/about/about";
import { NotificationProvider } from '../providers/notification/notification';
import { GroupProvider } from '../providers/group/group';
import { Network } from "@ionic-native/network";
import { ImgProvider } from '../providers/img/img';
import { LazyLoadDirective } from "../directives/lazy-load/lazy-load";
import { LazyImgComponent } from "../components/lazy-img/lazy-img";
import { Pro } from "@ionic/pro";
import { SQLite } from "@ionic-native/sqlite";

Pro.init('70a1a0db', {
  appVersion: '0.1.1'
});

@Injectable()
export class ProErrorHandler implements ErrorHandler {

  ionicErrorHandler: IonicErrorHandler;

  constructor(injector: Injector) {
    this.ionicErrorHandler = injector.get(IonicErrorHandler);
  }

  handleError(err: any): void {
    Pro.monitoring.handleNewError(err);
    this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
  }
}


@NgModule({
  declarations: [
    WavetrophyApp,
    HomePage,
    ListPage,
    LoginPage,
    SettingsPage,
    PopoverDefaultPage,
    FaqPage,
    AboutPage,
    LazyLoadDirective,
    LazyImgComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(WavetrophyApp),
    IonicStorageModule.forRoot({
      name: 'wavetrophy_0-1-1.db',
      driverOrder: ['sqlite', 'indexeddb'],
      storeName: '__wave_0-1-1'
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
    SettingsPage,
    PopoverDefaultPage,
    FaqPage,
    AboutPage,
    LazyImgComponent,
  ],
  providers: [
    HttpProvider,
    ConfigProvider,
    StatusBar,
    SplashScreen,
    SQLite,
    BackgroundMode,
    LocalNotifications,
    Network,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: configServiceFactory,
    //   deps: [ConfigProvider],
    //   multi: true,
    // },
    IonicErrorHandler,
    {provide: ErrorHandler, useClass: ProErrorHandler},
    LocationProvider,
    PopoverProvider,
    NotificationProvider,
    GroupProvider,
    ImgProvider,
  ]
})
export class AppModule {
}

export function configServiceFactory(config: ConfigProvider) {
  return () => config.loadConfig();
}
