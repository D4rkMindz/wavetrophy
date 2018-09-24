import { IPlatformDependentURL } from "./interfaces/IPlatformDependentURL";

/**
 * Class PlatformDependentURL
 */
export class PlatformDependentURL implements IPlatformDependentURL {
  /**
   * PlatformDependentURL constructor
   * @param androidURL
   * @param iosURL
   */
  public constructor(androidURL: string, iosURL: string) {
    this._android = androidURL;
    this._ios = iosURL;
  }

  /**
   * The URL for Android platform
   */
  private _android: string;

  /**
   * The URL getter for Android platform
   */
  get android(): string {
    return this._android;
  }

  /**
   * The URL for iOS platform
   */
  private _ios: string;

  /**
   * The URL getter for iOS platform
   */
  get ios(): string {
    return this._ios;
  }
}
