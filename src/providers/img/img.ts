import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import ImgCache from 'imgcache.js';

@Injectable()
export class ImgProvider {

  public imgQueue: string[] = [];

  constructor() {
    ImgCache.options.debug = true;
  }

  /**
   * Init imgCache library
   * @return {Promise}
   */
  public initImgCache(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (ImgCache.ready) {
        resolve();
      } else {
        ImgCache.init(() => resolve(), () => reject());
      }
    });
  }

  /**
   * Cache images
   * @param src {string} - img source
   * @param forceReload {boolean}
   */
  public cacheImg(src: string, forceReload: boolean= false): Promise<any> {
    return new Promise((resolve, reject) => {
      ImgCache.isCached(src, (path: string, success: boolean) => {
        // if not, it will be cached
        if (success && !forceReload) {
          ImgCache.getCachedFileURL(src,
            (originalUrl, cacheUrl) => {
              resolve(cacheUrl);
            },
            (e) => {
              reject(e)
            });
        } else {
          // cache img
          ImgCache.cacheFile(src);
          // return original img URL
          resolve(src);
        }
      });
    });
  }
}
