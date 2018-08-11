import {Injectable} from '@angular/core';
import {HttpProvider} from "../http/http";
import {Storage} from "@ionic/storage";

@Injectable()
export class ConfigProvider {
  /**
   * Configuration "storage"
   */
  private _config;

  /**
   * ConfigProvider constructor
   * @param {HttpProvider} http
   * @param {Storage} storage
   */
  constructor(private http: HttpProvider, private storage: Storage) {
    this._config = [];
  }

  /**
   * Load the configuration into the storage.
   *
   * @returns {Promise<void>}
   */
  public async loadConfig() {
    // Check if configuration was already loaded
    if (!(await this.hasConfigBeenLoadedBefore())) {
      // Load and save configuration
      const config = await this.http.get('assets/config/config.default.json');

      for (let key in config) {
        this._config[key] = config[key];
      }

      // Save configuration
      this.storage.set('config', this._config);

      // Set meta key that config was saved
      this.storage.set('meta.config.has_been_loaded', true);
    } else {
      // Load configuration from storage
      this._config = await this.storage.get('config');
    }
  }

  /**
   * Check if config has been loaded before (on bootstrap)
   *
   * @returns {Promise<boolean>}
   */
  private async hasConfigBeenLoadedBefore() {
    // const hasBeenLoaded = await this.storage.get('meta.config.has_been_loaded');
    // return !!hasBeenLoaded;
    return false
  }

  /**
   * Set a config value by the key
   *
   * @param {string} key
   * @param value
   */
  public set(key: string, value: any) {
    this._config[key] = value;
  }

  /**
   * Get a config value by the key
   *
   * @param {string} key
   * @returns {any}
   */
  public get(key: string): any {
    if (key in this._config) {
      return this._config[key];
    }
    throw Error(`You tried to access a configuration key that does not exist (key: ${key}`);
  }

  /**
   * Save all contacts to the storage
   *
   * This method needs to be called to persist all changed configurations. This method should be called before leaving
   * the app and after saving some settings.
   *
   * @returns {Promise<boolean>}
   */
  public async saveAll(): Promise<boolean> {
    try {
      await this.storage.set('config', this._config);
    } catch (e) {
      return false;
    }
    return true;
  }
}
