import {ILocation} from "./interfaces/ILocation";
import {IAddress} from "./interfaces/IAddress";
import {IWaveEvent} from "./interfaces/IWaveEvent";
import {IImageURL} from "./interfaces/IImageURL";

export class Location implements ILocation {
  /**
   * The unique identifier of the location
   */
  private _hash: string;

  /**
   * The title of the location
   */
  private _name: string;

  /**
   * The title images of the location
   */
  private _images: IImageURL[];

  /**
   * The title of the location
   */
  private _title: string;

  /**
   * The address of the location
   */
  private _address: IAddress;

  /**
   * All events of that are taking place at the location
   */
  private _events: IWaveEvent[];

  /**
   * Location constructor
   * @param {string} hash
   * @param {string} name
   * @param {IImageURL[]}images
   * @param title
   * @param {IAddress} address
   * @param {IWaveEvent[]} events
   */
  constructor(hash: string, name: string, images: IImageURL[], title: string, address: IAddress, events: IWaveEvent[]) {
    this._hash = hash;
    this._name = name;
    this._images = images;
    this._title = title;
    this._address = address;
    this._events = events;
  }

  get hash(): string {
    return this._hash;
  }

  get name(): string {
    return this._name;
  }

  get images(): IImageURL[] {
    return this._images;
  }

  get title(): string {
    return this._title;
  }

  get address(): IAddress {
    return this._address;
  }

  get events() {
    return this._events;
  }
}
