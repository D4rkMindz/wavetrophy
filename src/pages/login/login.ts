import { Component } from '@angular/core';
import { AlertController, App, MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TabsPage } from "../tabs/tabs";
import { AuthenticationProvider } from "../../providers/authentication/authentication";
import { GroupProvider } from "../../providers/group/group";
import { config } from "../../app/config";
import { Group } from "../../models/Group";
import { Storage } from "@ionic/storage";

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

  isLoading = false;
  error = false;
  loginForm: FormGroup;
  groups: Group[];

  constructor(private app: App,
              private menuCtrl: MenuController,
              private formBuilder: FormBuilder,
              private auth: AuthenticationProvider,
              private group: GroupProvider,
              private storage: Storage,
              private alertCtrl: AlertController) {
    this.buildForm();
  }

  public login() {
    if (!this.loginForm.valid) {
      return;
    }
    this.error = false;
    this.isLoading = true;
    const groupHash = this.loginForm.controls.groupNumber.value;
    if (this.loginForm.controls.password.value.trim().toLowerCase() !== 'louis') {
      const alert = this.alertCtrl.create({
        title: 'Passwort falsch',
        message: 'Das Passwort ist der Vorname des Veranstalters',
        buttons: ['OK'],
      });
      alert.present();
      return;
    }
    this.auth.authenticate()
      .subscribe((hasLoggedIn: boolean) => {
        if (hasLoggedIn) {
          this.menuCtrl.enable(true, 'main-menu');
          this.storage.set('groupHash', groupHash);
          this.isLoading = false;
          this.app.getRootNav().setRoot(TabsPage);
          return;
        }
        this.isLoading = false;
        this.error = true;
      });
  }

  private async loadGroups() {
    const groups = await this.group.getGroups(config.wave);
    this.groups = groups;
  }

  private buildForm() {
    this.menuCtrl.enable(false, 'main-menu');
    this.loadGroups();
    this.loginForm = this.formBuilder.group({
      groupNumber: ['', Validators.required],
      password: ['', Validators.compose([Validators.required])],
    });
  }
}
