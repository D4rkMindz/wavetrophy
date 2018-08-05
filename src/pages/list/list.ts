import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HttpProvider} from "../../providers/http/http";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  contacts: Array<{ name: string, position: string, phonenumber: string, email?: string }>;

  /**
   * ListPage constructor
   * @param navCtrl
   * @param http
   */
  constructor(public navCtrl: NavController, private http: HttpProvider) {
    this.loadContacts();
    // TODO Contacts load images with caching
    // TODO Contacts show placeholder image while loading images
  }

  /**
   * Load contacts from JSON-Data
   *
   * @todo Replace the asset URL with the URL on the Server.
   */
  private async loadContacts() {
    const data: any = await this.http.get('assets/json/testdata.json');
    this.contacts = data.contacts;
  }
}
