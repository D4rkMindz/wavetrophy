import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient} from "@angular/common/http";
import {Refresher, ToastController} from "ionic-angular";
import {CacheService} from "ionic-cache";
import {HTTP_CACHE_GROUP_KEY, HTTP_CACHE_TTL} from "../config/constants";

@Injectable()
export class HttpProvider {

  constructor(private http: HttpClient,
              private cache: CacheService,
              public toastCtrl: ToastController) {
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
      let toast = this.toastCtrl.create({
        message: 'Daten vom Server geladen',
        duration: 1000,
      });
      toast.present();
      return res;
    });
    let data;
    if (refresher) {
      let delayType = 'all';
      data = await this.cache.loadFromDelayedObservable(key, request, groupKey, ttl, delayType).toPromise();
      refresher.complete();
    } else {
      data = await this.cache.loadFromObservable(key, request, groupKey, ttl).toPromise()
    }
    return data;
  }
}
