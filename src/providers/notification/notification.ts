import {Injectable} from '@angular/core';
import {ILocation} from "../../models/interfaces/ILocation";
import {LocalNotifications} from '@ionic-native/local-notifications';
import {ConfigProvider} from "../config/config";

/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationProvider {

  constructor(private localNotifications: LocalNotifications,
              private config: ConfigProvider) {
  }

  public async registerLocationNotifications(locations: ILocation[]) {
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
    const notifications = [];
    locations.forEach((location: ILocation, locationIndex) => {
      const lastEventIndex = location.events.length - 1;
      const event = location.events[lastEventIndex];
      const id = locationIndex;
      const date = event['start'].subtract(notificationAhead, 'minutes').toDate();
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
      notifications.push(notification);
      console.log(`Notification scheduled for ${id}`);
    });
    this.localNotifications.schedule(notifications);
  }

}
