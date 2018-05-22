import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";

/**
 * Generated class for the RememberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-remember',
  templateUrl: 'remember.html',
})
export class RememberPage {

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public loadingCtrl: LoadingController,
     public toastCtrl: ToastController,
     public auth: AuthProvider
   ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RememberPage');
  }

  resend(values: any) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Sending ...'
    });

    loading.present();

    this.auth.resend(values)
      .subscribe(
        () => {loading.dismiss();
                this.handleError(`Check your email`);
                this.navCtrl.pop();
      },
        (err) => {
          loading.dismiss();
          console.log(err);
          this.handleError(err.error);}
      )
  }

  handleError(error: any) {
    let message = error;

    const toast = this.toastCtrl.create({
      message,
      duration: 5000,
      position: 'bottom'
    });

    toast.present();
  }

}
