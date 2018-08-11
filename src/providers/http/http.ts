import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient} from "@angular/common/http";
import {Refresher} from "ionic-angular";
import {CacheService} from "ionic-cache";

@Injectable()
export class HttpProvider {

  constructor(private http: HttpClient,
              private cache: CacheService) {
  }

  /**
   * HTTP GET request
   * @param url
   * @param {string} groupKey
   * @param {number} ttl
   * @param {Refresher} refresher
   * @returns {Promise<any>}
   */
  public async get(url, groupKey = 'default', ttl = (60 * 60 * 24 * 20), refresher?: Refresher) {
    let key = url;
    let request = this.http.get(url).map((res: Response) => {
      return res;
    });
    this.cache.clearAll();
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
