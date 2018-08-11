import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Storage} from "@ionic/storage";

import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';
import {LoginPage} from "../pages/login/login";
import {BackgroundMode} from "@ionic-native/background-mode";
import {CacheService} from "ionic-cache";

@Component({
  templateUrl: 'app.html'
})
export class WavetrophyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              private storage: Storage,
              private backgroundMode: BackgroundMode,
              private cache: CacheService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Stream', component: HomePage},
      {title: 'Kontakte', component: ListPage}
    ];

  }

  async initializeApp() {
    await this.platform.ready();
    // Okay, so the platform is ready and our plugins are available.
    // Here you can do any higher level native things you might need.
    this.statusBar.styleDefault();

    this.enableBackgroundMode();

    const isLoggedIn = await this.storage.get('meta.user.is_logged_in');
    if (!!isLoggedIn) {
      await this.nav.setRoot(HomePage);
    }
    this.cache.setDefaultTTL(60 * 60 * 24 * 20); // 20 Days TODO adjust for the maximum time of a wave-trophy
    this.cache.setOfflineInvalidate(false);

    this.splashScreen.hide();
  }

  private enableBackgroundMode() {
    if (!this.backgroundMode.isEnabled()) {
      this.backgroundMode.enable()
    }
    // TODO alert user if background mode is disabled
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
