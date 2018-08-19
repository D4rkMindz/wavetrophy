import { Injectable } from '@angular/core';
import {HttpProvider} from "../http/http";
import {IGroup} from "../../models/interfaces/IGroup";
import {HTTP_CACHE_GROUP_KEY, HTTP_CACHE_TTL} from "../config/constants";
import {Location} from "../../models/Location";
import {Refresher} from "ionic-angular";
import {Group} from "../../models/Group";

/*
  Generated class for the GroupProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GroupProvider {

  private _groups: IGroup[];
  private _groupsJSON: any;

  /**
   * GroupProvider constructor
   * @param http
   */
  constructor(private http: HttpProvider) {
  }

  /**
   * Get groups
   * @param wavetrophyHash
   * @return {Promise<IGroup[]>}
   */
  public async getGroups(wavetrophyHash: string) {
    if (this._groups.length > 0) {
      return this._groups;
    }
    await this.loadGroups(wavetrophyHash);
    return this._groups;
  }

  /**
   * Load groups from server
   * @param wavetropyHash
   * @param refresher
   */
  private async loadGroups(wavetropyHash: string, refresher?: Refresher) {
    try {
      const url = `https://api.wavetrophy.d4rkmindz.ch/v1/trophies/${wavetropyHash}/groups`;
      this._groupsJSON = await this.http.get(url, HTTP_CACHE_GROUP_KEY, HTTP_CACHE_TTL, refresher);
      this._groups = this.parseGroups(this._groupsJSON['groups']);
    } catch (e) {
      return false;
    }
    return true;
  }



  /**
   * Parse locations from received data
   * @param {any[]} data
   * @return {Location[]}
   */
  private parseGroups(data: any[]): Location[] {
    const groups = [];
    console.log(data);
    data.forEach((group) => {
      console.log('group', group);
      const hash = group.hash;
      const name = group.name;
      groups.push(new Group(hash, name));
    });
    return groups;
  }
}
