import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HttpProvider} from "../../providers/http/http";
import {ConfigProvider} from "../../providers/config/config";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  contacts: Array<{ name: string, position: string, phonenumber: string, email?: string }>;
  _full_contacts: Array<{ name: string, position: string, phonenumber: string, email?: string }>;

  /**
   * ListPage constructor
   * @param navCtrl
   * @param http
   * @param config
   */
  constructor(private navCtrl: NavController,
              private http: HttpProvider,
              private config: ConfigProvider) {
    this.loadContacts();
    // TODO Contacts load images with caching
    // TODO Contacts show placeholder images while loading images
  }

  search(event: any) {
    this.contacts = this._full_contacts;
    const searchQuery = event.target.value;
    if (searchQuery && searchQuery.trim() !== '') {
      this.contacts = this.contacts.filter((contact) => {
        const foundByName = contact.name.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;
        const foundByPosition = contact.position.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;
        return foundByName || foundByPosition;
      });
    }
  }

  /**
   * Call a contact
   * @param {string} number
   */
  call(number: string) {
    document.location.href = `tel:${number}`;
  }

  /**
   * Load contacts from JSON-Data
   *
   * @todo Replace the asset URL with the URL on the Server.
   */
  private async loadContacts() {
    const wavetrophyHash = this.config.get('wavetrophy.hash');
    const url = `https://api.wavetrophy.d4rkmindz.ch/v1/trophies/${wavetrophyHash}/contacts`;
    const data: any = await this.http.get(url);
    this.contacts = data.contacts;
    this._full_contacts = data.contacts;
  }
}
