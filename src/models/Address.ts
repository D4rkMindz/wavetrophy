import {IAddress} from "./interfaces/IAddress";
import {IPlatformDependentURL} from "./interfaces/IPlatformDependentURL";

export class Address implements IAddress {
  /**
   * The Google Maps URL for the Address
   */
  private _url: IPlatformDependentURL;

  /**
   * The Lat(itude) of the address
   */
  private _lat: string;

  /**
   * The Lon(gitude) of the address
   */
  private _lon: string;

  /**
   * The information of the address in human readable text
   */
  private _text: { city: string; zip: string; street: string; comment?: string };

  /**
   * Address constructor
   * @param {string} url
   * @param {string} lat
   * @param {string} lon
   * @param text
   */
  constructor(url: IPlatformDependentURL, lat: string, lon: string, text: { city: string; zip: string; street: string; comment?: string }) {
    this._url = url;
    this._lat = lat;
    this._lon = lon;
    this._text = text;
  }

  get url(): IPlatformDependentURL {
    return this._url;
  }

  get lat(): string {
    return this._lat;
  }

  get lon(): string {
    return this._lon;
  }

  get text(): { city: string; zip: string; street: string; comment?: string } {
    return this._text;
  }
}
