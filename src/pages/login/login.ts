import {Component} from '@angular/core';
import {Storage} from "@ionic/storage";
import {MenuController, NavController} from 'ionic-angular';
import {HomePage} from "../home/home";
import {FormBuilder, Validators} from "@angular/forms";
import {ConfigProvider} from "../../providers/config/config";

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

  loginForm;
  groupnumber;

  constructor(public navCtrl: NavController,
              private menuCtrl: MenuController,
              private formBuilder: FormBuilder,
              private storage: Storage,
              private config: ConfigProvider) {
    this.menuCtrl.enable(false, 'main-menu');
    this.loginForm = this.formBuilder.group({
      groupNumber: ['', Validators.required]
    });
    // TODO next: load groups from file/server
  }

  login() {
    console.log(this.loginForm.controls.groupNumber.value);
    this.config.set('user.groupnumber', this.loginForm.controls.groupNumber.value);
    this.config.saveAll();
    this.storage.set('meta.user.is_logged_in', true);
    this.menuCtrl.enable(true, 'main-menu');
    this.navCtrl.setRoot(HomePage);
  }
}
