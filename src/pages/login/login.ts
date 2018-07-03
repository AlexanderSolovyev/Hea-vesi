import { Component } from '@angular/core';
import {NavController, ToastController, LoadingController} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {TabsPage} from '../tabs/tabs';
import {SignupPage} from '../signup/signup';
import {RememberPage} from '../remember/remember';
import {StorageService} from "../storage.service";
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
  tabBarElement: any;
  constructor(public navCtrl: NavController,
              public toast: ToastController,
              public loadingCtrl: LoadingController,
              public storageservice: StorageService,
              public auth: AuthProvider) {
                this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }

  //token ={ auth_token: ''};

  ionViewWillEnter() {
    if (this.tabBarElement){
      this.tabBarElement.style.display = 'none';
    };
  }

  ionViewWillLeave() {
    if (this.tabBarElement){
      this.tabBarElement.style.display = 'flex';
    };
  }

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
        //this.navCtrl.setRoot(TabsPage)
        //  .then(() => this.navCtrl.popToRoot());
        console.log(token);
        this.getUser(token)
        //
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
  remember(){
    this.navCtrl.push(RememberPage);
  }
  getUser(token: any) {
      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Loading...'
      });

      //loading.present();
    this.auth.getUserdata(token.auth_token)
      .subscribe(
        (res) => {
          console.log(res);
          this.storageservice.data=res.info;

          this.auth.getGoods(token.auth_token)
            .subscribe(
              (goods) => {
                loading.dismiss();
                console.log(goods);
                this.storageservice.goods=goods;
                var initialHref = window.location.href;
                window.location.href = initialHref;
                this.navCtrl.setRoot(TabsPage)
                //.then(() =>this.navCtrl.parent.select(0));
                .then(() => this.navCtrl.popToRoot());;
              }
            )


        },
        (err) => {
            loading.dismiss();
          if (err.status == 401){
            this.auth.removeToken();
            this.navCtrl.setRoot(LoginPage)
            .then(() => this.navCtrl.popToRoot());

          //  this.navCtrl.setRoot(LoginPage)
          //    .then(() => this.navCtrl.popToRoot());
          }
          else {
            //this.getUser();
          }
        })
      }
}
