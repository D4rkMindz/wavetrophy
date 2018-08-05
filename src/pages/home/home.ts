import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import * as moment from "moment";
import {HttpProvider} from "../../providers/http/http";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  locations: any;
  information: any;

  /**
   * HomePage Constructor.
   *
   * @param navCtrl
   * @param http
   */
  constructor(public navCtrl: NavController, private http: HttpProvider) {
    this.loadLocations();
    // TODO load images with caching
    // TODO show placeholder image while loading images
  }

  /**
   * Load locations from JSON-Data
   *
   * @todo Replace the asset URL with the URL on the Server.
   */
  private async loadLocations() {
    const data: any = await this.http.get('assets/json/testdata.json');
    let locations = data.locations;

    // convert dates into moments (using moment.js)
    locations.forEach((v, locationIndex) => {
      locations[locationIndex]['events'].forEach((eventValue, eventIndex) => {
        locations[locationIndex]['events'][eventIndex]['date'] = moment(eventValue['date']);
      });
    });

    this.locations = locations;
  }
}
