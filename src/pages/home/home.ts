import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {OrderPage} from "../order/order";
import {SettingsPage} from "../settings/settings";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {



  deliveryTimes = [
    "9:00 - 17:00",
    "9:00 - 13:00",
    "13:00 - 17:00",
    "17:00 - 20:00"
  ];

  d = new Date();
  minDate=this.calculateTomorrow();
  deliveryDate=this.minDate;
  deliveryAddresses = [
    "Liikury 20-25, Tallinn"
  ];

  constructor(public navCtrl: NavController) {
    this.deliveryTime = this.deliveryTimes[0];
    this.deliveryAddress = this.deliveryAddresses[0];

  }
  goToOrder() {
    console.log(this.deliveryTime);
    console.log(this.deliveryDate);
    console.log(this.d);
    this.navCtrl.push(OrderPage);


  }
  GoToSettings() {
    this.navCtrl.push(SettingsPage)
  }
  calculateTomorrow() {
    let d = new Date();
    let nd = new Date(d.setDate(d.getDate()+1));
    return nd.toISOString();
  }
}
