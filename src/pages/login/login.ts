import {Component} from '@angular/core';
import {Storage} from "@ionic/storage";
import {MenuController, NavController} from 'ionic-angular';
import {HomePage} from "../home/home";
import {FormBuilder, Validators} from "@angular/forms";
import {ConfigProvider} from "../../providers/config/config";
import {GroupProvider} from "../../providers/group/group";
import {IGroup} from "../../models/interfaces/IGroup";

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
  public groups: IGroup[];

  constructor(public navCtrl: NavController,
              private menuCtrl: MenuController,
              private formBuilder: FormBuilder,
              private storage: Storage,
              private config: ConfigProvider,
              private group: GroupProvider) {
    this.menuCtrl.enable(false, 'main-menu');
    this.loginForm = this.formBuilder.group({
      groupNumber: ['', Validators.required]
    });
    this.loadGroups();
  }

  /**
   * Load groups
   */
  private async loadGroups() {
    const wavetrophyHash = this.config.get('wavetrophy.hash');
    this.groups = await this.group.getGroups(wavetrophyHash);
  }

  login() {
    console.log(this.loginForm.controls.groupNumber.value);
    this.config.set('group.hash', this.loginForm.controls.groupNumber.value);
    this.config.saveAll();
    this.storage.set('meta.user.is_logged_in', true);
    this.menuCtrl.enable(true, 'main-menu');
    this.navCtrl.setRoot(HomePage);
  }
}
