import { Injectable } from '@angular/core';
import {
  ILocalNotificationAction,
  ILocalNotificationActionType,
  LocalNotifications
} from "@ionic-native/local-notifications";
import { ILocation } from "../../models/interfaces/ILocation";
import { Storage } from "@ionic/storage";
import { config } from "../../app/config";
import { DomSanitizer } from "@angular/platform-browser";

@Injectable()
export class NotificationProvider {

  constructor(private notifications: LocalNotifications, private storage: Storage, private sanitizer: DomSanitizer) {
  }

  public async registerForUpcomingEvents(locations: ILocation[]) {

    const notificationsActive = await this.storage.get('notifications.active') || true;
    const notificationsAhead = await this.storage.get('notifications.ahead') || 15;
    const notificationsLEDColor = '#0F0';

    if (!notificationsActive) {
      return;
    }

    const notifications = [];
    locations.forEach((location: ILocation, locationIndex) => {
        const event = location.events[location.events.length - 1];
        // const triggerAt = event.start.subtract(notificationsAhead, "minutes").toDate();
        const triggerAt = new Date(new Date().getTime() + (locationIndex * 1000));
        if (locations[locationIndex + 1] !== undefined) {
          return;
        }
        const nextLocation = locations[locationIndex + 1];
        const nextCity = nextLocation.address.text.city;

        const data = {
          lat: nextLocation.address.lat,
          lon: nextLocation.address.lon,
        };

        const actions: ILocalNotificationAction[] = [
          {
            id: 'OPEN_MAP',
            title: 'Navigation starten',
            foreground: true,
            launch: true,
            needsAuth: true,
            type: ILocalNotificationActionType.BUTTON,
          }
        ];

        const notification = {
          trigger: {at: triggerAt},
          title: 'WAVETROPHY Reminder',
          text: `Es wird Zeit zum weiterfahren. Mache dich bereit um nach ${nextCity} zu fahren.`,
          led: notificationsLEDColor,
          vibrate: true,
          wakeup: true,
          priority: 2,
          actions: actions,
          lockscreen: true,
          channel: config.wave + '_events',
          data: data,
        };
        notifications.push(notification);
        console.log('registering notification for ' + notification.text);
      }
    );
    this.notifications.schedule(notifications);
    this.notifications.on('OPEN_MAP').subscribe((notification) => {
      console.log(notification);
      document.location.href = `geo:${notification.data.lat},${notification.data.lon}`;
    });
  }

}
