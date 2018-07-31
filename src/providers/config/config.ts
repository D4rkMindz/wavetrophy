import {Injectable} from '@angular/core';
import {HttpProvider} from "../http/http";
import {Storage} from "@ionic/storage";

@Injectable()
export class ConfigProvider {
  private _config;

  constructor(private http: HttpProvider, private storage: Storage) {
  }

  public async loadConfig() {
    const a = 'a';
    if (!(await this.hasConfigBeenLoadedBefore())) {
      let response = await this.http.get('assets/config/config.default.json');
      // TODO continue here. The response is structured like the config/config.default.json file. The config file is ONLY KEY => VALUE!
    }
  }

  private async hasConfigBeenLoadedBefore(){
    const hasBeenLoaded = await this.storage.get('meta.has_been_loaded');
    if (hasBeenLoaded) {
      return true;
    }
    return false;
  }

  public set(key: string, value: any) {
    this._config[key] = value;
  }

  public get(key: string): any {
    if (key in this._config) {
      return this._config[key];
    }
    throw Error(`You tried to access a configuration key that does not exist (key: ${key}`);
  }
}
