import {Component} from '@angular/core';
import {MenuController, NavController} from 'ionic-angular';
import * as moment from "moment";
import {HttpProvider} from "../../providers/http/http";
import {BackgroundMode} from "@ionic-native/background-mode";
import {LocalNotifications} from "@ionic-native/local-notifications";
import {ConfigProvider} from "../../providers/config/config";
import {LocationProvider} from "../../providers/location/location";
import {ILocation} from "../../models/interfaces/ILocation";

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
   * @param http
   * @param menuCtrl
   * @param backgroundMode
   * @param localNotifications
   * @param config
   * @param location
   */
  constructor(public navCtrl: NavController,
              private http: HttpProvider,
              private menuCtrl: MenuController,
              private backgroundMode: BackgroundMode,
              private localNotifications: LocalNotifications,
              private config: ConfigProvider,
              private location: LocationProvider) {
    // will be loaded if user is logged in via app.component.ts
    this.location.getLocations().then(locations => {
      this.locations = this.removePassedEvents(locations);
      this.registerNotifications(this.locations)
    });
    this.menuCtrl.enable(true, 'main-menu');
    // TODO Stream load images with caching
    // TODO Stream show placeholder image while loading images
    // TODO make subpage for each event to link to in notifications
  }

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

  private registerNotifications(locations) {
    this.backgroundMode.on('activate').subscribe(async () => {
      console.log('Registering Notifications');
      const showNotifications = this.config.get('notifications.active');
      const notificationColor = this.config.get('notifications.color');
      const notificationAhead = this.config.get('notifications.ahead'); // in minutes
      if (!showNotifications) {
        console.log('Registration cancelled');
        return;
      }
      console.log('Locations: ', locations);
      locations.forEach((location, locationIndex) => {
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
    });
  }
}
