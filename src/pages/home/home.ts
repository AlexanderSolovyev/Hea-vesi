import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, Platform, LoadingController, AlertController } from 'ionic-angular';
import {OrderPage} from "../order/order";
import {SettingsPage} from "../settings/settings";
import {StorageService} from "../storage.service";
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  active:boolean = false;

  order = {
    bottles: 2 ,
    returnedBottles: 2,
    deliveryDate: '',
    deliveryTime: '',
    deliveryAddress: '',
    information: ''
  };
//  data: {
//    name: string,
//    phone: string,
//    email: string,
//  } = this.storageservice.data
  //deliveryAdresses: string[]= this.storageservice.deliveryAddresses;
  deliveryTimes = [
    "9:00 - 17:00",
    "9:00 - 13:00",
    "13:00 - 17:00",
    "17:00 - 20:00"
  ];

  token: {auth_token: string};

  //deliveryAddresses = [
  //  "Liikury 20-25, Tallinn",
  //  "also address"
  //];
  deliveryTime = this.deliveryTimes[0];


  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public navParams: NavParams,
              private storageservice: StorageService,
              private auth: AuthProvider,
              public loadingCtrl: LoadingController,
              public plt: Platform) {
    this.plt.ready().then (() => {
      this.loadInitial();
      this.getUserdata();
    })

  }
  ngOnInit() {}

  goToOrder() {
    this.storageservice.saveOrder();
    this.storageservice.order.returnedBottles=this.storageservice.order.bottles;
    this.carGo();



  }
  GoToSettings() {

    this.navCtrl.push(SettingsPage)
  }
  minDate=this.calculateTomorrow();
  deliveryDate=this.minDate;

  calculateTomorrow() {
    let d = new Date();
    let nd = new Date(d.setDate(d.getDate()+1));
    return nd.toISOString();
  }
  decBottle(){
    if (this.order.bottles > 2) {
      this.storageservice.order.bottles= this.storageservice.order.bottles-1;
    };
  }
  incBottle(){
    this.storageservice.order.bottles= this.storageservice.order.bottles+1;
    };

  loadInitial(){
    this.storageservice.loadOrder();
    this.storageservice.loadAddresses()
      .then(
        data => {
          this.storageservice.deliveryAddresses=data;
          this.order.deliveryAddress = this.storageservice.deliveryAddresses[0];
          },
        error => this.navCtrl.push(SettingsPage)
      );
    this.order=this.storageservice.order;
    this.order.deliveryDate=this.deliveryDate;
  }
  carGo(){
    this.active=true;
    setTimeout(() =>{ this.navCtrl.push(OrderPage);}, 2100);


  };
  ionViewWillEnter(){
    this.active=false;

  }

  getUserdata() {
    this.auth.loadToken()
      .then((token) => {
        if (token) {
          let loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: 'Load data ...'
          });

          loading.present();
          this.auth.getUserdata(token)
            .subscribe(
              (res) => {
                loading.dismiss();
                this.storageservice.data=res.info;
                console.log(res);
            },
              (err) => {
                loading.dismiss();
                if (err.status == 401){
                  this.auth.removeToken();
                  this.navCtrl.setRoot(LoginPage)
                    .then(() => this.navCtrl.popToRoot());
                }
                else {
                  this.errorAlert(err);
                  this.getUserdata();
                }
              })
        }
        else {
          console.log('no token')
        }
      })
    }
    errorAlert(err) {
      console.log(err);
      let alert = this.alertCtrl.create({
        title: 'Server error',
        subTitle: err,
        buttons: ['Try again']
      });
      alert.present();
    }

}
