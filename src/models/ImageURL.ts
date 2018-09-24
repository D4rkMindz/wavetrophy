import { IImageURL } from "./interfaces/IImageURL";

/**
 * Class ImageURL
 */
export class ImageURL implements IImageURL {
  /**
   * ImageURL constructor
   * @param imageURL
   */
  public constructor(imageURL: string) {
    this._url = imageURL;
  }

  /**
   * URL for an images
   */
  private _url;

  /**
   * Getter for the URL
   */
  get url() {
    return this._url;
  }
}
