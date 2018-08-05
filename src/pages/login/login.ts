import {Component} from '@angular/core';
import {Storage} from "@ionic/storage";
import {MenuController, NavController, NavParams} from 'ionic-angular';
import {HomePage} from "../home/home";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  groupnumber;

  constructor(public navCtrl: NavController, private menuCtrl: MenuController, private storage: Storage) {
    this.menuCtrl.enable(false, 'main-menu');
  }

  login() {
    this.storage.set('user.groupnumber', this.groupnumber);
    this.storage.set('meta.user.is_logged_in', true);
    this.menuCtrl.enable(true, 'main-menu');
    this.navCtrl.setRoot(HomePage);
  }
}
