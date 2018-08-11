import {Injectable} from '@angular/core';
import {HttpProvider} from "../http/http";
import {ILocation} from "../../models/interfaces/ILocation";
import {WaveEvent} from "../../models/WaveEvent";
import {Location} from "../../models/Location";
import * as moment from "moment";
import {Address} from "../../models/Address";

@Injectable()
export class LocationProvider {

  private _locations: ILocation[] = [];
  private _locationsJSON: any;

  constructor(public http: HttpProvider) {
  }

  public async getLocations() {
    if (this._locations.length > 0) {
      return this._locations;
    }
    await this.loadLocations();
    return this._locations;
  }

  /**
   * Load locations from server.
   * @returns {Promise<boolean>}
   */
  private async loadLocations() {
    try {
      this._locationsJSON = await this.http.get('assets/json/testdata.json');
      this._locations = this.parseLocations(this._locationsJSON['locations']);
    } catch (e) {
      return false;
    }
    return true;
  }

  /**
   * Parse locations from received data
   * @param {any[]} data
   * @return {Location[]}
   */
  private parseLocations(data: any[]): Location[] {
    const locations = [];
    console.log(data);
    data.forEach((location) => {
      console.log('location', location);
      const hash = location.hash;
      const name = location.name;
      const image = location.image;
      const address = this.parseAddress(location.address);
      const events = this.parseEvents(location.events);
      locations.push(new Location(hash, name, image, address, events));
    });
    return locations;
  }

  /**
   * Parse address from received data
   * @param {any[]} addressData
   * @returns {Address}
   */
  private parseAddress(addressData: any[]): Address {
    const url = addressData['url'];
    const lat = addressData['lat'];
    const lon = addressData['lon'];
    const text = {
      city: addressData['text']['city'],
      zip: addressData['text']['zip'],
      street: addressData['text']['street'],
    };
    if ('comment' in addressData['text']) {
      text['comment'] = addressData['text']['comment'];
    }
    return new Address(url, lat, lon, text);
  }

  /**
   * Parse events from received data
   * @param {any[]} eventData
   * @return {WaveEvent[]}
   */
  private parseEvents(eventData: any[]): WaveEvent[] {
    let events = [];
    eventData.forEach((event) => {
      const hash = event.hash;
      const date = moment(event.date);
      const name = event.name;
      let description = '';
      if ('description' in event) {
        description = event.description;
      }
      events.push(new WaveEvent(hash, date, name, description));
    });
    return events;
  }

}
