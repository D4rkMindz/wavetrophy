import {Injectable} from '@angular/core';
import {HttpProvider} from "../http/http";
import {ILocation} from "../../models/interfaces/ILocation";
import {WaveEvent} from "../../models/WaveEvent";
import {Location} from "../../models/Location";
import * as moment from "moment";
import {Address} from "../../models/Address";
import {HTTP_CACHE_GROUP_KEY, HTTP_CACHE_TTL} from "../config/constants";
import {Refresher} from "ionic-angular";
import {PlatformDependentURL} from "../../models/PlatformDependentURL";
import {ImageURL} from "../../models/ImageURL";

@Injectable()
export class LocationProvider {

  private _locations: ILocation[] = [];
  private _locationsJSON: any;

  /**
   * LocationProvider constructor
   * @param http
   */
  constructor(public http: HttpProvider) {
  }

  /**
   * Get locations
   */
  public async getLocations() {
    if (this._locations.length > 0) {
      return this._locations;
    }
    await this.loadLocations();
    return this._locations;
  }

  /**
   * Force reload locations
   * @param {Refresher} refresher
   * @returns {Promise<void>}
   */
  public async forceGetLocations(refresher: Refresher) {
    await this.loadLocations(refresher);
    return this._locations;
  }

  /**
   * Load locations from server.
   * @returns {Promise<boolean>}
   */
  private async loadLocations(refresher?: Refresher) {
    try {
      const url = 'https://api.wavetrophy.d4rkmindz.ch/v1/trophies/wave2018/groups/group1/stream';
      this._locationsJSON = await this.http.get(url, HTTP_CACHE_GROUP_KEY, HTTP_CACHE_TTL, refresher);
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
      const images = this.parseImages(location.images);
      const title = location.title;
      const address = this.parseAddress(location.address);
      const events = this.parseEvents(location.events);
      locations.push(new Location(hash, name, images, title, address, events));
    });
    return locations;
  }

  /**
   * Parse images
   * @param images
   */
  private parseImages(images: any[]): ImageURL[] {
    let imgs = [];
    images.forEach((url: string) => {
      imgs.push(new ImageURL(url))
    });
    return imgs;
  }

  /**
   * Parse address from received data
   * @param {any} addressData
   * @returns {Address}
   */
  private parseAddress(addressData: any): Address {
    const url = new PlatformDependentURL(addressData['url']['android'], addressData['url']['ios']);
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
      const day = parseInt(event.day);
      const start = moment(event.start);
      const title = event.name;
      let images = [];
      event.images.forEach((image: string) => {
        images.push(new ImageURL(image));
      });
      let description = '';
      if ('description' in event) {
        description = event.description;
      }
      events.push(new WaveEvent(hash, day, start, title, images, description));
    });
    return events;
  }

}
