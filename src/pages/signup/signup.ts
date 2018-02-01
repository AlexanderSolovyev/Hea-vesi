import { Component } from '@angular/core';
import { NavController,LoadingController, ToastController} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public auth: AuthProvider) {
  }

  signup(values: any) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Signing up ...'
    });

    loading.present();

    this.auth.signup(values)
      .subscribe(
        () => {loading.dismiss();
                this.handleError(`Registration succefully`);
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
