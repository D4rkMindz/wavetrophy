import { Injectable } from '@angular/core';
import { HttpProvider } from "../http/http";
import { Storage } from "@ionic/storage";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class ConfigProvider {
  /**
   * Configuration "storage"
   */
  private _config;

  private _isReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * ConfigProvider constructor
   * @param {HttpProvider} http
   * @param {Storage} storage
   */
  constructor(private http: HttpProvider, private storage: Storage) {
    this._config = [];
  }

  public get isReady(): Observable<boolean> {
    return this._isReady.asObservable();
  }

  /**
   * Load the configuration into the storage.
   *
   * @returns {Promise<void>}
   */
  public async loadConfig() {
    // Check if configuration was already loaded
    const configHasBeenLoaded = await this.hasConfigBeenLoadedBefore();
    console.log('config has been loaded on config.ts:36', configHasBeenLoaded);
    if (!configHasBeenLoaded) {
      // Load and save configuration
      console.log('Loading config from server');
      const config = await this.http.get('assets/config/config.default.json');
      console.log('Loaded config', JSON.stringify(config));
      this._config = config;

      const url = 'https://api.wavetrophy.d4rkmindz.ch/v1/trophies';
      const response = await this.http.get(url);
      const currentWave = response.current;
      console.log('current wave:', currentWave);
      this._config['wavetrophy.hash'] = currentWave;
      console.log('all config on loaded ', JSON.stringify(this._config));
      // Save configuration
      const res = await this.saveAll();
      console.log('set config:', res);

      // Set meta key that config was saved
    } else {
      // Load configuration from storage
      console.log('getting config from storage');
      const conf = await this.storage.get('config');
      console.log('config from storage:', conf);
      this._config = JSON.parse(conf);
      console.log('config', this._config);
    }
    this._isReady.next(true);
  }

  /**
   * Set a config value by the key
   *
   * @param {string} key
   * @param value
   */
  public set(key: string, value: any) {
    console.log('CONFIG. Setting ' + key + ' value:' + value);
    this._config[key] = value;
    console.log('WHOLE CONFIG on set:', this._config);
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
      console.log('Configuration to save:', JSON.stringify(this._config));
      await this.storage.set('config', JSON.stringify(this._config));
    } catch (e) {
      return false;
    }
    return true;
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
   * Check if config has been loaded before (on bootstrap)
   *
   * @returns {Promise<boolean>}
   */
  private async hasConfigBeenLoadedBefore() {
    const hasBeenLoaded = await this.storage.get('config');
    console.log('config has been loaded:', hasBeenLoaded);
    return !!hasBeenLoaded;
  }
}
