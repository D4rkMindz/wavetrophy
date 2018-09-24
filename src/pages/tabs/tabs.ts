import { Component } from '@angular/core';

import { EventsPage } from "../events/events";
import { ContactsPage } from "../contacts/contacts";
import { SecurePage } from "../securepage";
import { AuthenticationProvider } from "../../providers/authentication/authentication";
import { App } from "ionic-angular";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage extends SecurePage {
  page1 = EventsPage;
  page2 = ContactsPage;
  pages = ['somerandomstring, see https://github.com/zyra/ionic2-super-tabs/issues/308'];

  constructor(auth: AuthenticationProvider, app: App) {
    super(auth, app);
  }

  public logout() {
    this.auth.logout().subscribe(loggedIn => {
      if (!loggedIn) {
        this.gotoLogin();
      }
    });
  }
}
