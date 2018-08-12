import {Component} from '@angular/core';
import {MenuController, NavController} from 'ionic-angular';
import * as moment from "moment";
import {BackgroundMode} from "@ionic-native/background-mode";
import {LocalNotifications} from "@ionic-native/local-notifications";
import {ConfigProvider} from "../../providers/config/config";
import {LocationProvider} from "../../providers/location/location";
import {ILocation} from "../../models/interfaces/ILocation";
import {PopoverProvider} from "../../providers/popover/popover";

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
   * @param menuCtrl
   * @param backgroundMode
   * @param localNotifications
   * @param config
   * @param location
   * @param popover
   */
  constructor(public navCtrl: NavController,
              private menuCtrl: MenuController,
              private backgroundMode: BackgroundMode,
              private localNotifications: LocalNotifications,
              private config: ConfigProvider,
              private location: LocationProvider,
              private  popover: PopoverProvider) {
    // will be loaded if user is logged in via app.component.ts
    this.location.getLocations().then(locations => {
      this.locations = this.removePassedEvents(locations);
    });
    this.backgroundMode.on('activate').subscribe(()=>{
      this.registerNotifications(this.locations);
    });
    this.menuCtrl.enable(true, 'main-menu');
    // TODO Stream load images with caching
    // TODO Stream show placeholder image while loading images
    // TODO make subpage for each event to link to in notifications
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
   * Remove all passed events from location array
   * @param {ILocation[]} locations
   * @returns {any[]}
   */
  private removePassedEvents(locations: ILocation[]) {
    const tmp = [];
    locations.forEach((location) => {
      const eventDate = location.events[location.events.length - 1].date;
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
    await this.localNotifications.cancelAll();
    await this.localNotifications.clearAll();
    console.log('Registering Notifications');
    const showNotifications = this.config.get('notifications.active');
    const notificationColor = this.config.get('notifications.color');
    const notificationAhead = this.config.get('notifications.ahead'); // in minutes
    if (!showNotifications) {
      console.log('Registration of Notification cancelled by user');
      return;
    }
    console.log('Locations: ', locations);
    locations.forEach((location: ILocation, locationIndex) => {
      const lastEventIndex = location.events.length - 1;
      const event = location.events[lastEventIndex];
      const id = locationIndex;
      const date = event['date'].subtract(notificationAhead, 'minutes').toDate();
      let nextLocation = 'das Ende der diesjährigen WAVETROPHY';
      if (locations[locationIndex + 1] !== undefined) {
        nextLocation = locations[locationIndex + 1].address.text.city;
      }
      console.log(`Scheduling Notification for ${nextLocation} (ID: ${id}) @ ${date}`);
      let notification = {
        id: id,
        trigger: {at: date},
        text: 'Es wird Zeit zum Weiterfahren. Der nächste Halt ist ' + nextLocation,
        led: notificationColor,
      };
      this.localNotifications.schedule(notification);
      console.log(`Notification scheduled for ${id}`);
    })
  }
}
