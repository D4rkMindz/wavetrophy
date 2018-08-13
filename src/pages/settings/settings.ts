import {Component} from '@angular/core';
import {ConfigProvider} from "../../providers/config/config";

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

  constructor(private config: ConfigProvider) {
  }

  onNotificationAheadChange(selectedValue) {
    console.log('Selected value:', selectedValue);
    this.notificationsAhead = <number>selectedValue;
  }

  ionViewDidLoad() {
    this.notificationsActive = this.config.get('notifications.active');
    this.notificationsAhead = this.config.get('notifications.ahead');
    console.log('onEnter. Reading...', this.notificationsAhead);
  }

  ionViewWillUnload() {
    console.log('onLeave. Saving...');
    this.config.set('notifications.active', this.notificationsActive);
    console.log('notifications.ahead', this.notificationsAhead);
    // TODO continue here by loading notifications ahead properly
    this.config.set('notifications.ahead', this.notificationsAhead);
    console.log('config.notifications.ahead', this.config.get('notifications.ahead'));
    this.config.saveAll();
  }
}
