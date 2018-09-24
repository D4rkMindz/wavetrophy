import { IPlatformDependentURL } from "./IPlatformDependentURL";

export interface IAddress {
  /**
   * The Google Maps URL for the Address
   */
  url: IPlatformDependentURL;

  /**
   * The Lat(itude) of the address
   */
  lat: string;

  /**
   * The Lon(gitude) of the address
   */
  lon: string;

  /**
   * The information of the address in human readable text
   */
  text: { city: string, zip: string, street: string, comment?: string };
}
