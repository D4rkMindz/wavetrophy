import {IWaveEvent} from "./interfaces/IWaveEvent";
import {Moment} from "moment";

export class WaveEvent implements IWaveEvent {
  /**
   * The hash of the event
   */
  private _hash: string;

  /**
   * The moment when the event starts
   */
  private _date: Moment;

  /**
   * The name of the event
   */
  private _name: string;

  /**
   * The optional description of the event
   */
  private _description: string;

  /**
   * Event constructor
   * @param {string} hash
   * @param {moment.Moment} date
   * @param {string} name
   * @param {string} description
   */
  constructor(hash: string, date: Moment, name: string, description?: string) {
    this._hash = hash;
    this._date = date;
    this._name = name;
    this._description = description;
  }

  get date(): Moment {
    return this._date;
  }

  get hash(): string {
    return this._hash;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

}
