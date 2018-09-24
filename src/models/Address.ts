import { IAddress } from "./interfaces/IAddress";
import { IPlatformDependentURL } from "./interfaces/IPlatformDependentURL";

export class Address implements IAddress {
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

  /**
   * The Google Maps URL for the Address
   */
  private _url: IPlatformDependentURL;

  get url(): IPlatformDependentURL {
    return this._url;
  }

  /**
   * The Lat(itude) of the address
   */
  private _lat: string;

  get lat(): string {
    return this._lat;
  }

  /**
   * The Lon(gitude) of the address
   */
  private _lon: string;

  get lon(): string {
    return this._lon;
  }

  /**
   * The information of the address in human readable text
   */
  private _text: { city: string; zip: string; street: string; comment?: string };

  get text(): { city: string; zip: string; street: string; comment?: string } {
    return this._text;
  }
}
