import { Injectable } from '@angular/core';
import { HttpProvider } from "../http/http";
import { config } from "../../app/config";
import { Group } from "../../models/Group";

@Injectable()
export class GroupProvider {

  constructor(private http: HttpProvider) {
  }

  public async getGroups(wavetrophy: string) {
    const url = config.api + '/trophies/' + wavetrophy + '/groups';
    const response = <any>await this.http.get(url);
    const groups = [];
    for (const group of response.groups) {
      groups.push(new Group(group.hash, group.name));
    }
    return groups;
  }


}
