import { NgModule, ErrorHandler, APP_INITIALIZER, Injectable, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { HttpProvider } from '../providers/http/http';
import { ContactsPage } from "../pages/contacts/contacts";
import { EventsPage } from "../pages/events/events";
import { FaqPage } from "../pages/faq/faq";
import { LoginPage } from "../pages/login/login";
import { SettingsPage } from "../pages/settings/settings";
import { EventProvider } from '../providers/event/event';
import { GroupProvider } from '../providers/group/group';
import { HttpClientModule } from "@angular/common/http";
import { IonicStorageModule } from "@ionic/storage";
import { SuperTabsModule } from "ionic2-super-tabs";
import { ContactProvider } from '../providers/contact/contact';
import { Contacts } from "@ionic-native/contacts";
import { AboutPage } from "../pages/about/about";
import { NotificationProvider } from '../providers/notification/notification';
import { LocalNotifications } from "@ionic-native/local-notifications";
import { Pro } from "@ionic/pro";
import { Diagnostic } from "@ionic-native/diagnostic";


Pro.init('70a1a0db', {
  appVersion: '0.2.0'
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
    MyApp,
    AboutPage,
    ContactsPage,
    EventsPage,
    FaqPage,
    LoginPage,
    SettingsPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__wavetrophy-010',
      driverOrder: ['indexeddb'],
      storeName: 'ionic'
    }),
    SuperTabsModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactsPage,
    EventsPage,
    FaqPage,
    LoginPage,
    SettingsPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LocalNotifications,
    IonicErrorHandler,
    Diagnostic,
    Contacts,
    {provide: ErrorHandler, useClass: ProErrorHandler},
    {
      provide: APP_INITIALIZER,
      useFactory: authenticationFactory,
      deps: [AuthenticationProvider],
      multi: true,
    },

    AuthenticationProvider,
    HttpProvider,
    EventProvider,
    GroupProvider,
    ContactProvider,
    NotificationProvider
  ]
})
export class AppModule {
}

export function authenticationFactory(auth: AuthenticationProvider) {
  return () => auth.bootstrap();
}
