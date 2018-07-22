import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{name: string, phonenumber: string, email?: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    this.items.push({name: 'Björn Pfoster', phonenumber: '+41764510128', email:'bjoern.pfoster@gmail.com'});
    this.items.push({name: 'Remo Camenisch', phonenumber: '+41764510129'});
    this.items.push({name: 'Lorenz Camenisch', phonenumber: '+41764510130'});
    this.items.push({name: 'Erich Camenisch', phonenumber: '+41764510131'});
    // for (let i = 1; i < 11; i++) {
    //   this.items.push({
    //     title: 'Item ' + i,
    //     note: 'This is item #' + i,
    //     icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    //   });
    // }
  }

  itemTapped(event, item) {

  }
}
