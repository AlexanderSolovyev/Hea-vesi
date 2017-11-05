import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {OkPage} from "../ok/ok";

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goToOk(){
    this.navCtrl.push(OkPage)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }

}
