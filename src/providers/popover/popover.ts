import { Injectable } from '@angular/core';
import {PopoverController} from "ionic-angular";
import {PopoverDefaultPage} from "../../pages/popover-default/popover-default";

/*
  Generated class for the PopoverProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PopoverProvider {

  constructor(public popoverCtrl:PopoverController) {
  }

  presentDefault(event) {
    const popover = this.popoverCtrl.create(PopoverDefaultPage);
    popover.present({
      ev: event,
    });
  }

}
