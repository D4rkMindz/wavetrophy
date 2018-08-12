import {IAddress} from "./IAddress";
import {IWaveEvent} from "./IWaveEvent";

export interface ILocation {
  /**
   * The unique identifier of the location
   */
  hash: string;

  /**
   * The name of the location
   */
  name: string;

  /**
   * The title image of the location
   */
  image: string;

  /**
   * The title of the location
   */
  title: string;

  /**
   * The address of the location
   */
  address: IAddress;

  /**
   * All events of that are taking place at the location
   */
  events: IWaveEvent[];
}
