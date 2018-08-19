import {IImageURL} from "./interfaces/IImageURL";

/**
 * Class ImageURL
 */
export class ImageURL implements IImageURL{
  /**
   * URL for an images
   */
  private _url;

  /**
   * ImageURL constructor
   * @param imageURL
   */
  public constructor(imageURL: string) {
    this._url = imageURL;
  }

  /**
   * Getter for the URL
   */
  get url() {
    return this._url;
  }
}
