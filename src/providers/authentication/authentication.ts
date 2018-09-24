import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { Storage } from "@ionic/storage";

/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticationProvider {
  private _isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private storage: Storage) {
  }

  public get currentStatus(): boolean {
    return this._isAuthenticated.getValue();
  }

  public get status(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }

  public async bootstrap() {
    // todo find better way to prove logged in
    const hash = await this.storage.get('groupHash');
    // hash exists
    if (!!hash) {
      this._isAuthenticated.next(true);
    }
  }

  public authenticate() {
    this._isAuthenticated.next(true);
    return this._isAuthenticated.asObservable();
  }

  public logout() {
    this.storage.clear();
    this._isAuthenticated.next(false);
    return this._isAuthenticated.asObservable();
  }
}
