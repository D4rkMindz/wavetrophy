import {Component} from '@angular/core';
import {MenuController, NavController, Platform} from 'ionic-angular';
import * as moment from "moment";
import {BackgroundMode} from "@ionic-native/background-mode";
import {LocationProvider} from "../../providers/location/location";
import {ILocation} from "../../models/interfaces/ILocation";
import {PopoverProvider} from "../../providers/popover/popover";
import {NotificationProvider} from "../../providers/notification/notification";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  locations: any;
  information: any;

  /**
   * HomePage constructor
   *
   * @param navCtrl
   * @param platform
   * @param menuCtrl
   * @param backgroundMode
   * @param location
   * @param popover
   * @param notifications
   */
  constructor(public navCtrl: NavController,
              public platform: Platform,
              private menuCtrl: MenuController,
              private backgroundMode: BackgroundMode,
              private location: LocationProvider,
              private  popover: PopoverProvider,
              protected notifications: NotificationProvider) {
    // will be loaded if user is logged in via app.component.ts
    this.backgroundMode.on('activate').subscribe(() => {
      this.registerNotifications(this.locations);
    });
    this.menuCtrl.enable(true, 'main-menu');
    // TODO Stream load images with caching
    // TODO Stream show placeholder images while loading images
    // TODO make subpage for each event to link to in notifications
  }

  async ionViewWillEnter() {
    await this.loadLocations();
  }

  /**
   * Present default popover
   * @param {any} event
   */
  presentDefaultPopover(event) {
    this.popover.presentDefault(event);
  }

  /**
   * Refresh all locations (force)
   * @param refresher
   */
  refreshLocations(refresher) {
    // TODO maybe disable reloading or move it to settings
    this.location.forceGetLocations(refresher);
  }

  /**
   * Load locations from server/cache
   */
  async loadLocations() {
    const locations = await this.location.getLocations();
    this.locations = await this.removePassedEvents(locations);
  }

  /**
   * Remove all passed events from location array
   * @param {ILocation[]} locations
   * @returns {any[]}
   */
  private removePassedEvents(locations: ILocation[]) {
    const tmp = [];
    locations.forEach((location) => {
      const eventDate = location.events[location.events.length - 1].start;
      if (eventDate.isAfter(moment(), 'hours')) {
        tmp.push(location);
      }
    });
    return tmp;
  }

  /**
   * Register notifications with Location data
   * @param {ILocation[]} locations
   * @returns {Promise<void>}
   */
  private async registerNotifications(locations: ILocation[]) {
    if (this.platform.is('cordova')) {
      await this.notifications.registerLocationNotifications(locations);
    } else {
      console.log('Notifications not registered. Cordova is not available');
    }
  }
}
