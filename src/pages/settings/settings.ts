import { Component } from '@angular/core';
import { Storage } from "@ionic/storage";

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {


  notificationsActive: boolean = true;
  notificationsAhead: number = 15;
  notificationsAheadOptions = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

  constructor(private storage: Storage) {
  }

  onNotificationAheadChange(selectedValue) {
    this.notificationsAhead = <number>selectedValue;
  }

  async ionViewDidLoad() {
    this.notificationsActive = await this.storage.get('notifications.active') || true;
    this.notificationsAhead = await this.storage.get('notifications.ahead') || 15;
  }

  async ionViewWillUnload() {
    await this.storage.set('notifications.active', this.notificationsActive);
    await this.storage.set('notifications.ahead', this.notificationsAhead);
  }

}
