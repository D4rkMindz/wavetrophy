import { Moment } from "moment";
import { IImageURL } from "./IImageURL";

export interface IWaveEvent {
  /**
   * The hash of the event
   */
  hash: string;

  /**
   * The day of the wavetrophy (first day of trophy = 1)
   */
  day: number;

  /**
   * The moment when the event starts
   */
  start: Moment;

  /**
   * The title of the event
   */
  title: string;

  /**
   * The optional description of the event
   */
  description: string;

  /**
   * Event Images
   */
  images: IImageURL[];
}
