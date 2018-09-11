import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
import {SettingsPage} from "../settings/settings";
import {FaqPage} from "../faq/faq";
import {AboutPage} from "../about/about";
import {ConfigProvider} from "../../providers/config/config";
import {LoginPage} from "../login/login";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the PopoverSettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-popover-default',
  template: `
    <ion-list>
      <button ion-item (click)="openSettings()">Einstellungen</button>
      <button ion-item (click)="openAbout()">Über</button>
      <button ion-item (click)="openFAQ()">Fragen & Antworten</button>
      <button ion-item (click)="changeGroup()">Gruppe wechseln</button>
      <button ion-item (click)="clearCache()">Cache leeren</button>
    </ion-list>
  `,
})
export class PopoverDefaultPage {

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              private storage: Storage,
              private config: ConfigProvider) {
  }

  async openSettings() {
    await this.navCtrl.push(SettingsPage);
    await this.viewCtrl.dismiss();
  }

  async openAbout() {
    this.navCtrl.push(AboutPage);
    await this.viewCtrl.dismiss();
  }

  async openFAQ() {
    this.navCtrl.push(FaqPage);
    await this.viewCtrl.dismiss();
  }

  async clearCache() {
    await this.storage.clear();
    await this.config.loadConfig();
  }

  async changeGroup() {
    this.navCtrl.setRoot(LoginPage);
  }
}
