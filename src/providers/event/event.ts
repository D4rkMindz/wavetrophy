import { Injectable } from '@angular/core';
import { HttpProvider } from "../http/http";
import { config } from "../../app/config";
import * as moment from 'moment';
import { WaveEvent } from "../../models/WaveEvent";
import { Address } from "../../models/Address";
import { Location } from "../../models/Location";
import { PlatformDependentURL } from "../../models/PlatformDependentURL";
import { ImageURL } from "../../models/ImageURL";
import { Storage } from "@ionic/storage";

/*
  Generated class for the EventProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventProvider {

  constructor(private http: HttpProvider, private storage: Storage) {
  }

  /**
   * Get all events
   * @param wavetrophyHash
   * @param groupHash
   */
  public async getAllLocations(wavetrophyHash: string, groupHash: string): Promise<Location[]> {
    let locations = await this.storage.get('locations');
    if (locations) {
      return this.parseLocations(locations);
    }
    const url = config.api + '/trophies/' + wavetrophyHash + '/groups/' + groupHash + '/stream';
    const response = await this.http.get(url);
    locations = this.parseLocations(response['locations']);
    this.storage.set('locations', response['locations']);
    return locations;
  }

  /**
   * Parse locations from received data
   * @param {any[]} data
   * @return {Location[]}
   */
  private parseLocations(data: any[]): Location[] {
    const locations = [];
    data.forEach((location) => {
      const hash = location.hash;
      const images = this.parseImages(location.images);
      const title = location.title;
      const address = this.parseAddress(location.address);
      const events = this.parseEvents(location.events);
      const description = location.description;
      locations.push(new Location(hash, description, images, title, address, events));
    });
    return locations;
  }


  /**
   * Parse images
   * @param images
   */
  private parseImages(images: any[]): ImageURL[] {
    let imgs = [];
    images.forEach((image: any) => {
      imgs.push(new ImageURL(image.url))
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
      const title = event.title;
      let images = [];
      event.images.forEach((image: any) => {
        images.push(new ImageURL(image.url));
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
