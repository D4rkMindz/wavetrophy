import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import * as moment from "moment";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  locations: any;
  information: any;

  constructor(public navCtrl: NavController) {
    this.locations = [
      {
        id: 1,
        name: 'Winterthur',
        // TODO get current location via GPS (saddr)
        url: 'https://maps.google.com/?daddr=47.388789,8.676881+to:47.500412,8.676881',
        image: 'assets/imgs/placeholder.png',
        address: {
          lat: '47.500412',
          lon: '8.676881',
          text: {
            city: 'Winterthur',
            zip: '5003',
            street: 'Bahnhofstrasse 431',
            comment: 'Beim Torbogen',
          }
        },
        events: [
          {
            id: 1,
            date: moment('2018-09-06 11:00:00'),
            name: 'Ankunft',
            description: '',
          },
          {
            id: 2,
            date: moment('2018-09-06 11:15:00'),
            name: 'Führung',
            description: 'Eine Führung durch Winterthur',
          },
          {
            id: 3,
            date: moment('2018-09-06 12:00:00'),
            name: 'Essen',
            description: 'Das Mittagessen für alle Fahrer der Wave',
          },
          {
            id: 4,
            date: moment('2018-09-06 13:00:00'),
            name: 'Abfahrt',
            description: '',
          },
        ],
      },
      {
        id: 2,
        name: 'Winterthur',
        image: 'assets/imgs/placeholder.png',
        url: 'https://maps.google.com/?daddr=47.388789,8.676881+to:47.500412,8.721401',
        address: {
          lat: '47.500412',
          lon: '8.676881',
          text: {
            city: 'Winterthur',
            zip: '5003',
            street: 'Bahnhofstrasse 431',
            comment: 'Beim Torbogen',
          }
        },
        events: [
          {
            id: 1,
            date: moment('2018-09-06 11:00:00'),
            name: 'Ankunft',
            description: '',
          },
          {
            id: 2,
            date: moment('2018-09-06 11:15:00'),
            name: 'Führung',
            description: 'Eine Führung durch Winterthur',
          },
          {
            id: 3,
            date: moment('2018-09-06 12:00:00'),
            name: 'Essen',
            description: 'Das Mittagessen für alle Fahrer der Wave',
          },
          {
            id: 4,
            date: moment('2018-09-06 13:00:00'),
            name: 'Abfahrt',
            description: '',
          },
        ],
      },
    ];
  }

  toggleSection(i) {
    this.information[i].open = !this.information[i].open;
  }
}
