import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{ name: string, position: string, phonenumber: string, email?: string }>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
      'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    this.items.push({
      name: 'Björn Pfoster',
      position: 'Group Leader 3',
      phonenumber: '+41764510128',
      email: 'bjoern.pfoster@gmail.com'
    });
    this.items.push({name: 'Remo Camenisch', position: 'Group Leader 3', phonenumber: '+41764510129'});
    this.items.push({name: 'Lorenz Camenisch', position: 'Group Leader 3', phonenumber: '+41764510130'});
    this.items.push({name: 'Erich Camenisch', position: 'Group Leader 3', phonenumber: '+41764510131'});
  }

  itemTapped(event, item) {

  }
}
