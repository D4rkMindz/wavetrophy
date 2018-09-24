import { AuthenticationProvider } from "../providers/authentication/authentication";
import { App } from "ionic-angular";
import { LoginPage } from "./login/login";

export class SecurePage {

  constructor(protected auth: AuthenticationProvider, private app: App) {
  }

  ionViewCanEnter() {
    const canEnter = this.auth.currentStatus;
    if (!canEnter) {
      this.gotoLogin();
    }
    return canEnter;
  }

  protected gotoLogin() {
    setTimeout(() => this.app.getRootNav().setRoot(LoginPage));
  }
}
