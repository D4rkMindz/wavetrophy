import { Component } from '@angular/core';
import { EventProvider } from "../../providers/event/event";
import { config } from "../../app/config";
import { Location } from "../../models/Location";
import { Storage } from "@ionic/storage";
import { ILocation } from "../../models/interfaces/ILocation";
import * as moment from "moment";
import { DomSanitizer } from "@angular/platform-browser";
import {NotificationProvider} from "../../providers/notification/notification";

/**
 * Generated class for the EventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  events: Location[];
  isLoading = true;

  constructor(private event: EventProvider,
              private notifications: NotificationProvider,
              private storage: Storage,
              private sanitizer: DomSanitizer) {
  }

  geo(lat, lon) {
    return this.sanitizer.bypassSecurityTrustUrl(`geo:0,0?q=${lat},${lon}`);
  }

  async ionViewWillEnter() {
    await this.loadEvents()
  }

  private async loadEvents() {
    const wavetrophyHash = config.wave;
    const groupHash = await this.storage.get('groupHash');
    const events = await this.event.getAllLocations(wavetrophyHash, groupHash);
    this.isLoading = false;
    this.events = this.removePassedEvents(events);
    this.notifications.registerForUpcomingEvents(this.events);
  }

  /**
   * Remove all passed events from location array
   * @param {ILocation[]} locations
   * @returns {any[]}
   */
  private removePassedEvents(locations: ILocation[]): Location[] {
    const tmp = [];
    locations.forEach((location) => {
      const event = location.events[location.events.length - 1];
      if (event && 'start' in event) {
        const eventDate = event.start;
        if (eventDate.isAfter(moment(), 'hours')) {
          tmp.push(location);
        }
      }
    });
    return tmp;
  }
}
