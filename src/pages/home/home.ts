import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {OrderPage} from "../order/order";
import {SettingsPage} from "../settings/settings";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  goToOrder() {
    this.navCtrl.push(OrderPage);


  }
  GoToSettings() {
    this.navCtrl.push(SettingsPage)
  }

}
