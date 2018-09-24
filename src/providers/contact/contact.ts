import { Injectable } from '@angular/core';
import { HttpProvider } from "../http/http";
import { IContact } from "../../models/interfaces/IContact";
import { config } from "../../app/config";
import { Contact } from "../../models/Contact";
import { Storage } from "@ionic/storage";

@Injectable()
export class ContactProvider {

  constructor(private http: HttpProvider, private storage: Storage) {
  }

  /**
   * Get all contacts
   * @param wavetrophyHash
   */
  public async getContacts(wavetrophyHash: string): Promise<IContact[]> {
    const contacts = await this.storage.get('contacts');
    if (contacts) {
      return this.parseContacts(contacts);
    }
    const url = config.api + '/trophies/' + wavetrophyHash + '/contacts';
    const response: any = await this.http.get(url);
    this.storage.set('contacts', response.contacts);
    return this.parseContacts(response.contacts)
  }

  /**
   * Parse all contacts
   * @param contacts
   */
  private parseContacts(contacts) {
    const cnts = [];
    for (const contact of contacts) {
      cnts.push(new Contact(contact.first_name, contact.last_name, contact.position, contact.phonenumber, contact.email))
    }
    return cnts;
  }
}
