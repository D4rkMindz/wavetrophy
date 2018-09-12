import {Component} from '@angular/core';
import {Storage} from "@ionic/storage";
import {MenuController, NavController, NavParams} from 'ionic-angular';
import {HomePage} from "../home/home";
import {FormBuilder, Validators} from "@angular/forms";
import {ConfigProvider} from "../../providers/config/config";
import {GroupProvider} from "../../providers/group/group";
import {IGroup} from "../../models/interfaces/IGroup";
import {CacheService} from "ionic-cache";

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
    this.buildForm();
    if (!this.config.get('meta.config.has_been_loaded')) {
      console.log('Constructor reload called');
      this.reload();
    }
  }

  async ionViewDidLoad() {
    // TODO Continue here, The Sidemenu wont open after viewCtrl dismiss (change group)
    console.log('IonViewDidLoad in login.ts');
    this.menuCtrl.enable(false, 'main-menu');
    const reload = this.navParam.get('reload');
    if (reload) {
      console.log('ionviewdidload reload called');
      this.reload();
    }
  }

  async ionViewDidLeave() {
    this.menuCtrl.enable(true, 'main-menu');
  }

  async reload() {
    this.buildForm();
    await this.storage.clear();
    await this.cache.clearAll();
    await this.config.loadConfig();
    await this.loadGroups();
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
    console.log('before menuctrl enable login.ts');
    this.menuCtrl.enable(true, 'main-menu');
    console.log('after menuctrl enable login.ts');
    const i = this.menuCtrl.isEnabled('main-menu');
    console.log('main menu enabled:', i);
    this.config.set('group.hash', this.loginForm.controls.groupNumber.value);
    this.config.saveAll();
    this.storage.set('meta.user.is_logged_in', true);
    this.navCtrl.setRoot(HomePage);
  }
}
