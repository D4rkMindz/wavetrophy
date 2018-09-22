import { Component } from '@angular/core';
import { Storage } from "@ionic/storage";
import { MenuController, NavController, NavParams } from 'ionic-angular';
import { HomePage } from "../home/home";
import { FormBuilder, Validators } from "@angular/forms";
import { ConfigProvider } from "../../providers/config/config";
import { GroupProvider } from "../../providers/group/group";
import { IGroup } from "../../models/interfaces/IGroup";
import { CacheService } from "ionic-cache";

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
              private navParam: NavParams,
              public menuCtrl: MenuController,
              private formBuilder: FormBuilder,
              private storage: Storage,
              private cache: CacheService,
              private config: ConfigProvider,
              private group: GroupProvider) {
    this.check();
  }

  async ionViewDidLoad() {
    this.check();
  }

  async ionViewDidLeave() {
    this.menuCtrl.enable(true, 'main-menu');
  }

  async reload() {
    console.log('clearing all');
    this.cache.clearAll();
    console.log('cleared all, clearing storage');
    await this.storage.clear();
    console.log('cleared storage, loading config');
    this.config.loadConfig();
  }

  private check() {
    this.buildForm();
    this.loadGroups();
    console.log('IonViewDidLoad in login.ts');
    this.menuCtrl.enable(false, 'main-menu');
    const reload = this.navParam.get('reload') || false;
    // const reload = false;
    console.log('Login.ts constructor , should reload: ', reload);
    if (reload) {
      console.log('Constructor reload called');
      this.reload();
    }
  }

  /**
   * Load groups
   */
  private async loadGroups() {
    const wavetrophyHash = this.config.get('wavetrophy.hash');
    this.groups = await this.group.getGroups(wavetrophyHash);
  }

  private buildForm() {
    this.loginForm = this.formBuilder.group({
      groupNumber: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.menuCtrl.enable(true, 'main-menu');
    console.log('Group number @login', this.loginForm.controls.groupNumber.value);
    this.config.set('group.hash', this.loginForm.controls.groupNumber.value);
    this.config.saveAll().then(() => {
      this.storage.set('meta.user.is_logged_in', true);
    });
    this.navCtrl.setRoot(HomePage);
  }
}
