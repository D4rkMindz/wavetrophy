import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
import {SettingsPage} from "../settings/settings";

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
    </ion-list>
  `,
})
export class PopoverDefaultPage {

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController) {
  }

  async openSettings() {
    await this.navCtrl.push(SettingsPage);
    await this.viewCtrl.dismiss();
  }

  async openAbout() {
    await this.viewCtrl.dismiss();
    // TODO create about page
  }

  async openFAQ() {
    await this.viewCtrl.dismiss();
    // TODO create FAQ page
  }
}
