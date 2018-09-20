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
      console.log('Loaded config', config);
      this._config = [];
      for (let key in config) {
        this._config[key] = config[key];
      }

      const url = 'https://api.wavetrophy.d4rkmindz.ch/v1/trophies';
      const response = await this.http.get(url);
      const currentWave = response.current;
      console.log('current wave:', currentWave);
      this._config['wavetrophy.hash'] = currentWave;

      // Save configuration
      const res = await this.saveAll();
      console.log('set config:', res);

      // Set meta key that config was saved
    } else {
      // Load configuration from storage
      console.log('getting config from storage');
      const conf = await this.storage.get('config');
      this._config = JSON.parse(conf);
      console.log('config', this._config);
    }
  }

  /**
   * Check if config has been loaded before (on bootstrap)
   *
   * @returns {Promise<boolean>}
   */
  private async hasConfigBeenLoadedBefore() {
    const hasBeenLoaded = await this.storage.get('config');
    return !!hasBeenLoaded;
  }

  /**
   * Set a config value by the key
   *
   * @param {string} key
   * @param value
   */
  public set(key: string, value: any) {
    console.log('CONFIG. Setting ' +key+' value:' +value);
    this._config[key] = value;
    console.log('WHOLE CONFIG on set:', this._config);
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
    //throw Error(`You tried to access a configuration key that does not exist (key: ${key}`);
    return null;
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
      console.log('Configuration to save:', this._config);
      await this.storage.set('config', JSON.stringify(this._config));
    } catch (e) {
      return false;
    }
    return true;
  }
}
