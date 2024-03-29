import { IWaveEvent } from "./interfaces/IWaveEvent";
import { Moment } from "moment";
import { IImageURL } from "./interfaces/IImageURL";

/**
 * Class WaveEvent
 */
export class WaveEvent implements IWaveEvent {
  /**
   * Event constructor
   * @param {string} hash
   * @param {number} day
   * @param {moment} start
   * @param {string} title
   * @param {string} description
   * @param {IImageURL[]}images
   */
  constructor(hash: string, day: number, start: Moment, title: string, images: IImageURL[], description?: string) {
    this._hash = hash;
    this._day = day;
    this._start = start;
    this._title = title;
    this._description = description;
    this._images = images;
  }

  /**
   * The hash of the event
   */
  private _hash: string;

  get hash(): string {
    return this._hash;
  }

  /**
   * The day of the wavetrophy (first day of trophy = 1)
   */
  private _day: number;

  get day(): number {
    return this._day;
  }

  /**
   * The moment when the event starts
   */
  private _start: Moment;

  get start(): Moment {
    return this._start;
  }

  /**
   * The title of the event
   */
  private _title: string;

  get title(): string {
    return this._title;
  }

  /**
   * The optional description of the event
   */
  private _description: string;

  get description(): string {
    return this._description;
  }

  /**
   * Event Images
   */
  private _images: IImageURL[];

  get images(): IImageURL[] {
    return this._images;
  }

}
