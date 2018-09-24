import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { FaqPage } from "../pages/faq/faq";
import { SettingsPage } from "../pages/settings/settings";
import { AboutPage } from "../pages/about/about";
import { LocalNotifications } from "@ionic-native/local-notifications";
import { Storage } from "@ionic/storage";
import { Diagnostic } from "@ionic-native/diagnostic";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = TabsPage;

  menuItems: any[] = [
    {
      name: 'Fragen und Antworten',
      page: FaqPage,
    },
    {
      name: 'Einstellungen',
      page: SettingsPage,
    },
    {
      name: 'Über',
      page: AboutPage,
    },
  ];

  constructor(platform: Platform,
              storage: Storage,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              notifications: LocalNotifications,
              diagnostic: Diagnostic) {
    platform.ready().then(() => {
      return storage.get('notificationswarning.disabled');
    }).then(async (notificationsWarningDisabled) => {
      statusBar.styleDefault();
      splashScreen.hide();
      console.log('notificationswarningdisabled: ', notificationsWarningDisabled);
      if (!notificationsWarningDisabled) {
        const notificationsPermission = await notifications.hasPermission();
        console.log('notifications permission: ', notificationsPermission);
        if (!notificationsPermission) {
          notifications.requestPermission();
        }

        const contactsPermission = await diagnostic.isContactsAuthorized();
        console.log('contacts auth: ', contactsPermission);
        if (!contactsPermission) {
          diagnostic.requestContactsAuthorization();
        }
        // todo maybe inform the user about the required permissions... (alert or something...)
      }
    });
  }

  public openPage(item) {
    this.nav.push(item.page);
  }
}
