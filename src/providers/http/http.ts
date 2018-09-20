import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient} from "@angular/common/http";
import {Refresher} from "ionic-angular";
import {CacheService} from "ionic-cache";
import {HTTP_CACHE_GROUP_KEY, HTTP_CACHE_TTL} from "../config/constants";
import {Network} from "@ionic-native/network";

@Injectable()
export class HttpProvider {
  private _isConnected: boolean = false;

  /**
   * HttpProvider constructor
   * @param {HttpClient} http
   * @param {CacheService} cache
   * @param {Network} network
   */
  constructor(private http: HttpClient,
              private cache: CacheService,
              private network: Network) {
    this.network.onDisconnect().subscribe(() => this._isConnected = false);
    this.network.onConnect().subscribe(() => this._isConnected = true);
  }

  /**
   * HTTP GET request
   * @param url
   * @param {string} groupKey
   * @param {number} ttl
   * @param {Refresher} refresher
   * @returns {Promise<any>}
   */
  public async get(url, groupKey = HTTP_CACHE_GROUP_KEY, ttl = HTTP_CACHE_TTL, refresher?: Refresher) {
    let key = url;
    let request = this.http.get(url).map((res: Response) => {
      // todo find out why it does get the error '_getPortal'. If u comment the code below out, ionic will not throw an error...
      // let toast = this.toastCtrl.create({
      //   message: 'Daten aktualisert',
      //   duration: 1000,
      // });
      // toast.present();
      return res;
    });
    let data;
    let delayType = 'all';
    console.log(`Requesting URL ${url}. Network connection: ${this._isConnected}`);
    // TODO return data as observable to prevent flackering
    if (refresher && this._isConnected) {
      console.log('Force reloading from server');
      data = await this.cache.loadFromDelayedObservable(key, request, groupKey, ttl, delayType).toPromise();
      refresher.complete();
    } else if (this._isConnected) {
      console.log('Loading from server');
      data = await this.cache.loadFromDelayedObservable(key, request, groupKey, ttl, delayType).toPromise();
    } else {
      data = await this.cache.loadFromObservable(key, request, groupKey, ttl).toPromise();
      console.log('Loading from cache');
    }
    return data;
  }
}
