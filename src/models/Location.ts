import { ILocation } from "./interfaces/ILocation";
import { IAddress } from "./interfaces/IAddress";
import { IWaveEvent } from "./interfaces/IWaveEvent";
import { IImageURL } from "./interfaces/IImageURL";

export class Location implements ILocation {
  /**
   * Location constructor
   * @param {string} hash
   * @param {string} name
   * @param description
   * @param {IImageURL[]}images
   * @param title
   * @param {IAddress} address
   * @param {IWaveEvent[]} events
   */
  constructor(hash: string, description: string, images: IImageURL[], title: string, address: IAddress, events: IWaveEvent[]) {
    this._hash = hash;
    this._description = description;
    this._images = images;
    this._title = title;
    this._address = address;
    this._events = events;
  }

  /**
   * The unique identifier of the location
   */
  private _hash: string;

  get hash(): string {
    return this._hash;
  }

  /**
   * The title images of the location
   */
  private _images: IImageURL[];

  get images(): IImageURL[] {
    return this._images;
  }

  /**
   * The title of the location
   */
  private _title: string;

  get title(): string {
    return this._title;
  }

  /**
   * The address of the location
   */
  private _address: IAddress;

  get address(): IAddress {
    return this._address;
  }

  /**
   * All events of that are taking place at the location
   */
  private _events: IWaveEvent[];

  get events() {
    return this._events;
  }

  /**
   * The description to the location
   */
  private _description: string;

  get description(): string {
    return this._description;
  }
}
