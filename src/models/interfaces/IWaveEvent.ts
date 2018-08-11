import {Moment} from "moment";

export interface IWaveEvent {
  /**
   * The hash of the event
   */
  hash: string;

  /**
   * The moment when the event starts
   */
  date: Moment;

  /**
   * The name of the event
   */
  name: string;

  /**
   * The optional description of the event
   */
  description: string;
}
