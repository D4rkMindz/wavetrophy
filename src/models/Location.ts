import {ILocation} from "./interfaces/ILocation";
import {IAddress} from "./interfaces/IAddress";
import {IWaveEvent} from "./interfaces/IWaveEvent";

export class Location implements ILocation {
  /**
   * The unique identifier of the location
   */
  private _hash: string;

  /**
   * The name of the location
   */
  private _name: string;

  /**
   * The title image of the location
   */
  private _image: string;

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
   * @param {string} image
   * @param {IAddress} address
   * @param {IWaveEvent[]} events
   */
  constructor(hash: string, name: string, image: string, address: IAddress, events: IWaveEvent[]) {
    this._hash = hash;
    this._name = name;
    this._image = image;
    this._address = address;
    this._events = events;
  }

  get address(): IAddress {
    return this._address;
  }

  get image(): string {
    return this._image;
  }

  get name(): string {
    return this._name;
  }

  get hash(): string {
    return this._hash;
  }

  get events(): IWaveEvent[] {
    return this._events;
  }
}
