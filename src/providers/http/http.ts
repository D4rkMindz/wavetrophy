import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class HttpProvider {

  constructor(private http: HttpClient) {
  }

  /**
   * HTTP GET request.
   *
   * @param {string} url
   * @param {string} token
   * @returns {Promise<any>}
   */
  public async get(url, token = null ) {
    return await this.http.get(url).toPromise();
  }
}
