import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ok',
  templateUrl: 'ok.html',
})
export class OkPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  active: boolean=true;
  ionViewWillEnter () {
    setTimeout(() => {
      this.active=false;
    }, 2750);
  };
  toStartPage() {
    this.navCtrl.popToRoot();
  }

}
