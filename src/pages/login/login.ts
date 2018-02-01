import { Component } from '@angular/core';
import {NavController, ToastController, LoadingController} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {HomePage} from '../home/home'
import {SignupPage} from '../signup/signup'
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

  constructor(public navCtrl: NavController,
              public toast: ToastController,
              public loadingCtrl: LoadingController,
              public auth: AuthProvider) {
  }

  //token ={ auth_token: ''};

  login(values:any){
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Logging in ...'
    });

    loading.present();

    this.auth.login(values)
    .subscribe(
      token => {
        this.auth.saveToken(token.auth_token);
        loading.dismiss();
        this.navCtrl.setRoot(HomePage)
          .then(() => this.navCtrl.popToRoot());
      },
      err => {loading.dismiss();
        this.handleError(err)})
  }

  signup(){
    this.navCtrl.push(SignupPage)
  }
  handleError(error: any) {
    let message: string;
    if (error.status && error.status === 401) {
      message = 'Login failed';
    }
    else {
      message = `Unexpected error: ${error.statusText}`;
    }

    const toast = this.toast.create({
      message,
      duration: 5000,
      position: 'bottom'
    });

    toast.present();
  }
}
