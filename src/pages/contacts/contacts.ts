import { Component } from '@angular/core';
import { ContactProvider } from "../../providers/contact/contact";
import { IContact } from "../../models/interfaces/IContact";
import { config } from "../../app/config";
import { ActionSheetController, Platform } from "ionic-angular";
import { ContactField, ContactName, Contacts } from "@ionic-native/contacts";

/**
 * Generated class for the ContactsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {

  isLoading = true;
  contacts: IContact[];
  private _full_contacts: IContact[];

  constructor(private contact: ContactProvider,
              private actionSheet: ActionSheetController,
              private nativeContacts: Contacts,
              private platform: Platform) {
    this.loadContacts();
  }

  /**
   * Search contacts.
   * @param event
   */
  search(event: any) {
    this.contacts = this._full_contacts;
    const searchQuery = event.target.value;
    if (searchQuery && searchQuery.trim() !== '') {
      this.contacts = this.contacts.filter((contact: IContact) => {
        const foundByFirstName = contact.first_name.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;
        const foundByLastName = contact.last_name.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;
        const foundByPosition = contact.position.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;
        return foundByFirstName || foundByLastName || foundByPosition;
      });
    }
  }

  /**
   * Call a contact
   * @param {IContact} contact
   */
  showContact(contact: IContact) {
    // document.location.href = `tel:${number}`;

    const contactActionSheet = this.actionSheet.create({
      title: `${contact.first_name} ${contact.last_name}`,
    });
    contactActionSheet.addButton({
      text: 'Anrufen',
      handler: () => {
        document.location.href = `tel:${contact.phonenumber}`;
      },
    });
    contactActionSheet.addButton({
      text: 'SMS senden',
      handler: () => {
        document.location.href = `sms:${contact.phonenumber}`;
      },
    });
    if (contact.email) {
      contactActionSheet.addButton({
        text: 'Email Senden',
        handler: () => {
          document.location.href = `mailto:${contact.email}`;
        },
      });
    }
    contactActionSheet.addButton({
      text: 'Speichern',
      handler: () => {
        if (!this.platform.is('cordova')) {
          contactActionSheet.dismiss();
          return;
        }

        const nativeContact = this.nativeContacts.create();
        nativeContact.name = new ContactName(null, contact.last_name, contact.first_name);
        nativeContact.displayName = contact.last_name + ' ' + contact.first_name;
        nativeContact.phoneNumbers = [new ContactField('mobile', contact.phonenumber)];
        if (contact.email) {
          nativeContact.emails = [new ContactField('email', contact.email)];
        }
        try {
          nativeContact.save()
            .then(() => {
                contactActionSheet.dismiss();
              },
              (e) => {
                console.log('ERROR SAVING CONTACT: ', JSON.stringify(e));
              });
        } catch (e) {
          console.log('SAVING CONTACT ERROR: ', JSON.stringify(e))
        }
      }
    });
    contactActionSheet.addButton({
      text: 'Abbrechen',
      role: 'cancel',
      handler: () => {
        console.log('Cancelled');
      },
    });
    contactActionSheet.present();
  }

  private async loadContacts() {
    this.contacts = await this.contact.getContacts(config.wave);
    this.isLoading = false;
    this._full_contacts = this.contacts;
  }
}
