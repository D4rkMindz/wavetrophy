import {IAddress} from "./IAddress";
import {IWaveEvent} from "./IWaveEvent";
import {IImageURL} from "./IImageURL";

export interface ILocation {
  /**
   * The unique identifier of the location
   */
  hash: string;

  /**
   * The title of the location
   */
  name: string;

  /**
   * The title images of the location
   */
  images: IImageURL[];

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
