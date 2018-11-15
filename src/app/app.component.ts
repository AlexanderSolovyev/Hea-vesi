import { Component } from '@angular/core';
import { Platform, LoadingController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ScreenOrientation} from "@ionic-native/screen-orientation";

import {StorageService} from "../pages/storage.service";
import { AuthProvider } from '../providers/auth/auth'
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform,
      statusBar: StatusBar,
      splashScreen: SplashScreen,
      screenOrientation: ScreenOrientation,
      public storageservice: StorageService,
      public loadingCtrl: LoadingController,
      private alertCtrl: AlertController,
      public auth: AuthProvider
      ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT);
    });
    auth.loadToken()
      .then((token) =>{
        if (token) {
          this.getUser(token)
        }
        else {
          this.rootPage=LoginPage
        }
      })
  }

  getUser(token: any) {
      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Laadimine ...'
      });

      loading.present();
      this.auth.getUserdata(token)
        .subscribe(
          (res) => {
            this.storageservice.data=res.info;
            this.auth.getGoods(token)
              .subscribe(
                (goods) => {
                  loading.dismiss();
                  console.log(goods);
                  this.storageservice.goods=goods;
                  this.rootPage=TabsPage;
                }
              )

        },
          (err) => {
            loading.dismiss();
            if (err.status == 401){
              this.auth.removeToken();
              this.rootPage=LoginPage;

            //  this.navCtrl.setRoot(LoginPage)
            //    .then(() => this.navCtrl.popToRoot());
            }
            else {
              this.errorAlert(token,"Palun provige uuesti");
            }
          })
        }

  errorAlert(token,err) {
    console.log(err);
    let alert = this.alertCtrl.create({
      title: 'Serveri viga',
      subTitle: err,
      buttons: [
        {text:'Ok',
        handler: () => { this.getUser(token);}
      }
      ]
    });
    alert.present();
  }
}
